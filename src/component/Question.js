import Answer from "./Answer";

function Question(props) {
  const answerListTags = props.answers.map((answer) => (
    <Answer
      answer={answer.answer}
      isHeld={answer.isHeld}
      runHold={() => props.runHold(answer.id, props.id)}
      questionId={props.id}
      key={answer.id}
      id={answer.id}
      correct={answer.isCorrect}
      heldCorrect={answer.heldCorrect}
      heldIncorrect={answer.heldIncorrect}
      checked={answer.checked}
    />
  ));

  return (
    <div className="quiz-post">
      <span className="question">{props.question}</span>
      <ul className="answers">{answerListTags}</ul>
    </div>
  );
}

export default Question;
