import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../utils/mutations';
import Auth from '../../utils/auth';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import useLoginClick from '../../utils/loginClick';

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
    <div style={{ maxWidth: '60%', marginLeft: '10%' }}>
      <h2>Add Review</h2>
      <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" marginBottom={2}>
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
          <Button type="submit" variant="contained" color="primary" style={{ marginLeft: '10px' }}>
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
      {error && <p>Error: Please <a className="no-text-dec" onClick={handleLoginClick}>log in</a> to add a comment.</p>}
    </div>
  );
};

export default CommentForm;
