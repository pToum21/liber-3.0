import { useState } from 'react'
import { useMutation } from 'react-router-dom'
import { ADD_REVIEW } from '../../utils/mutations'

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
                    commentText,
                    rating,
                    userId: Auth.getProfile().data.username,
                }
            })
            setCommentText('');
            setRating(0);
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    const handleComment = (event) => {
        const { name, value } = event.target;

        setCommentText(value)
    }
    const handleRatingChange = (event) => {
        setRating(Number(event.target.value));
      };



      return (
        <div>
          <h2>Add Review</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                value={comments}
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
            <button type="submit" disabled={loading}>
              Add Review
            </button>
          </form>
          {error && <p>Error: {error.message}</p>}
        </div>
      );  
}

export default CommentForm;