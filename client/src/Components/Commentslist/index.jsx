// everything called comment should be changed to review


const CommentList = ({ reviews = [] }) => {
    if (!reviews.length) {
      return <h3>No Comments Yet</h3>;
    }
  
    return (
      <>
        <h3
          className="p-5 display-inline-block"
          style={{ borderBottom: '1px dotted #1a1a1a' }}
        >
          Reviews
        </h3>
        <div className="flex-row my-4">
          {reviews &&
          reviews.map((review) => (
              <div key={review._id} className="col-12 mb-3 pb-3">
                <div className="p-3 bg-dark text-light">
                  <h5 className="card-header">
                    {review.userId.username} commented{' '}
                    <span style={{ fontSize: '0.825rem' }}>
                      on {review.createdAt}
                    </span>
                  </h5>
                  <p className="card-body">{review.commentText}</p>
                </div>
              </div>
            ))}
        </div>
      </>
    );
  };
  
  export default CommentList;
  