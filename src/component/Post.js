function Post(props) {
  const { quiz, handleChoice } = props;

  const createQuestionPost = quiz.map((item) => {
    return (
      <div className="quiz-post">
        <span className="question">{item.question}</span>
        <ul className="answers">
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrect_answers[0]}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrect_answers[1]}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.correct_answer}
          </li>
          <li className="answer-list" onClick={handleChoice}>
            {item.incorrect_answers[2]}
          </li>
        </ul>
      </div>
    );
  });
  return <div>{createQuestionPost}</div>;
}

export default Post;
