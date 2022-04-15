function Welcome({ handleStart }) {
  return (
    <div className="welcome">
      <h1 className="welcome-title">Quizzical App</h1>
      <span className="welcome-description">Some description if needed.</span>
      <button className="btn" onClick={handleStart}>
        Start Quiz
      </button>
    </div>
  );
}

export default Welcome;
