function welcome(props) {
  return (
    <div className="welcome">
      <h1 className="welcome-title">Quizzical App</h1>
      <span className="welcome-description">Some description if needed</span>
      <button className="btn-start" onClick={props.handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default welcome;
