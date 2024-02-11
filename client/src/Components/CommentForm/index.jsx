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
import Login from '../Login/Login';


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
    <div style={{paddingRight: '1rem'}}>
        <h2>Add Review</h2>
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        
            {error && <p>Error: Please <a href="#" className="no-text-dec" style={{border:'none', backgroundColor:'transparent'}} onClick={handleLoginClick}>log in</a> to add a comment.</p>}
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
              backgroundColor: '#8abbb1',
              color: '#f3f3ec',
              '&:hover': {
                backgroundColor: '#6a8e86',
              },
              marginTop: '1rem',
              marginBottom: '1rem'
            }}>
              Post
            </Button>
       
          <Box marginBottom={2} sx={{display: 'flex'}}>
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

      <Modal open={isLoginModalOpen} onClose={handleLoginModalClose}>
        <div>
          <Login open={isLoginModalOpen} onClose={handleLoginModalClose} />
        </div>
      </Modal>
      </div>
    </>

  );
};

export default CommentForm;
