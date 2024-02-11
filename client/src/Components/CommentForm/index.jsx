import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
// import Auth from '../../utils/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import useLoginClick from '../../utils/loginClick';
import { useEffect } from 'react';
import { Modal } from '@mui/material';
import Login from '../../pages/Login';


const CommentForm = ({ bookId }) => {
  const [commentText, setCommentText] = useState('');
  const [addReview, { error }] = useMutation(ADD_REVIEW);
  const [rating, setRating] = useState(0);

  const {
    isLoginModalOpen,
    isMenuOpen,
    isLoggedIn,
    logout,
    handleMenuOpen,
    handleMenuClose,
    handleLoginClick,
    handleLoginModalClose
  } = useLoginClick();

  useEffect(() => {
    console.log("isLoginModalOpen:", isLoginModalOpen);
  }, [isLoginModalOpen]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      
      const { data } = await addReview({
        variables: {
          bookId,
          content: commentText,
          rating: parseInt(rating),
        },
        refetchQueries: ['getSingleBook']
      });


      // const variables = {
      //   bookId,
      //   content: commentText,
      // };
  
      // // Only include rating if it's greater than 0
      // if (parseInt(rating) > 0) {
      //   variables.rating = parseInt(rating);
      // } else {
      //   return variables
      // }
  
      // const { data } = await addReview({
      //   variables,
      //   refetchQueries: ['getSingleBook']
      // });
  


      setCommentText('');
      setRating(0);
      console.log(commentText);
    } catch (error) {
      console.error(error);
    }
  };

  const handleComment = (event) => {
    const { value } = event.target;
    setCommentText(value);
  };

  const handleRatingChange = (event, newRating) => {
    setRating(newRating);
  };

  return (
    <>
      <div style={{ maxWidth: '60%', marginLeft: '10%' }}>
        <h2>Add Review</h2>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" alignItems="center" marginBottom={2}>
            {error && <p>Error: Please <button className="no-text-dec" sx={{border:'none', backgroundColor:'transparent'}} onClick={handleLoginClick}>log in</button> to add a comment.</p>}
            <TextField
              id="comments"
              name="content"
              value={commentText}
              onChange={handleComment}
              placeholder="Add a comment..."
              variant="outlined"
              multiline
              rows={3}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" sx={{
              marginLeft: '10px', backgroundColor: '#8abbb1',
              color: '#f3f3ec',
              '&:hover': {
                backgroundColor: '#6a8e86',
              },
            }}>
              Post
            </Button>
          </Box>
          <Box marginBottom={2}>
            <label htmlFor="rating" style={{ marginRight: '3rem', }}>
              Rating:
            </label>
            <Rating
              id="rating"
              value={rating}
              onChange={handleRatingChange}
              max={5}
              precision={0.5}
            />
          </Box>
        </form>

      </div>

      <Modal open={isLoginModalOpen} onClose={handleLoginModalClose}>
        <div>
          <Login open={isLoginModalOpen} onClose={handleLoginModalClose} />
        </div>
      </Modal>
    </>

  );
};

export default CommentForm;
