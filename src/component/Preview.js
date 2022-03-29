function Preview(props) {
  return (
    <div className="preview">
      <h1 className="preview-title">Quizzical App</h1>
      <span className="preview-description">Some description if needed</span>
      <button className="btn-start" onClick={props.handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default Preview;
