import Answer from "./Answer";

export default function Question(props) {
  const runHold = (id) => {
    props.runHold(id, props.id);
  };

  const answerEls = props.answers.map((answer) => {
    return (
      <Answer
        answer={answer.answer}
        isHeld={answer.isHeld}
        runHold={() => runHold(answer.id)}
        questionId={props.id}
        key={answer.id}
        id={answer.id}
        correct={answer.correct}
        heldCorrect={answer.heldCorrect}
        heldIncorrect={answer.heldIncorrect}
        checked={answer.checked}
      />
    );
  });

  return (
    <div className="container--question">
      <h2 dangerouslySetInnerHTML={{ __html: props.question }} />
      <div className="container--answers">{answerEls}</div>
      <hr />
    </div>
  );
}
