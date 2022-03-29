function Post(props) {
  const { quiz, handleChoice } = props;

  const createQuestionPost = quiz.map((item) => {
    return (
      <div className="quiz-post" key={item.id}>
        <span className="question">{item.question}</span>
        <ul className="answers">
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrectAnswer[0]}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrectAnswer[1]}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.correctAnswer}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrectAnswer[2]}
          </li>
        </ul>
      </div>
    );
  });
  return <div>{createQuestionPost}</div>;
}

export default Post;
