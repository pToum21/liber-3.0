// everything called comment should be changed to review
import Rating from '@mui/material/Rating';

const CommentList = ({ reviews }) => {
  if (!reviews.length) {
    return <h3>No Comments Yet</h3>;
  }

  console.log(reviews);

  return (
    <>
      <h3
        className="p-5 display-inline-block"
        style={{ borderBottom: '1px dotted #1a1a1a', fontSize: '1.5rem' }}
      >
        Reviews
      </h3>
      <div style={{ maxHeight: '30vh', overflow: 'scroll', backgroundColor: '#eeeee3' }}>
        {reviews &&
          reviews.map((review) => (
            <div key={review._id} className="col-12 mb-3 pb-3" style={{ margin: '1rem' }}>
              <div className="p-3 bg-dark text-light">
                <p className="card-header" style={{ fontSize: '1rem' }}>
                  {new Date(parseInt(review.createdAt)).toLocaleString()}
                </p>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p>rating:</p>
                  <Rating name="read-only" value={review.rating} precision={0.5} readOnly />
                </div>
                <p className="card-body" style={{ fontSize: '1.2rem' }}><span style={{ fontWeight: 'bolder', }}>{review.userId && review.userId.username || 'Anonymous'}</span> said, <em>{review.content}</em></p>
              </div>
            </div>
          ))}
      </div >
    </>
  );
};

export default CommentList;
