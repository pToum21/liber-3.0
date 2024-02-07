import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_REVIEW } from '../../utils/mutations'

import Auth from '../../utils/auth'

const CommentForm = ({ bookId }) => {
    const [commentText, setCommentText] = useState('');
    const [addReview, { error }] = useMutation(ADD_REVIEW);
    const [rating, setRating ] = useState(0);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await addReview({
                variables: {
                    bookId,
                    comments: commentText,
                    rating:parseInt(rating),
                }
            })
            setCommentText('');
            setRating(0);
            console.log(commentText)
        } catch (error) {
            console.error(error)
        }
    }
    const handleComment = (event) => {
        const { name, value } = event.target;

        setCommentText(value)
    }
    const handleRatingChange = (event) => {
        setRating((event.target.value));
      };



      return (
        <div>
          <h2>Add Review</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                name= "comments"
                value={commentText}
                onChange={handleComment}
                required
              />
            </div>
            <div>
              <label htmlFor="rating">Rating:</label>
              <input
                type="number"
                id="rating"
                value={rating}
                onChange={handleRatingChange}
                min="0"
                max="5"
                required
              />
            </div>
            <button type="submit">
              Add Review
            </button>
          </form>
          {error && <p>Error: {error.message}</p>}
        </div>
      );  
}

export default CommentForm;