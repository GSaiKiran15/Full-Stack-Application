export default function CommentList({ comments }) {
 if (!comments || comments.length === 0) {
    return null;
  }

  return (
    <>
      <h3>Comments:</h3>
      {comments.map((comment) => (
        <div key={comment}>
          <h4>{comment.postedBy}</h4>
          <p>{comment.text}</p>
        </div>
      ))}
    </>
  );
}

