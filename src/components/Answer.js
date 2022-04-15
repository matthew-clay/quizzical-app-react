import { decode } from "html-entities";

function Answer(props) {
  const answerList = props.answers.map((answer) => {
    const isSelected = props.selectedAnswers.find(
      (selectedAnswer) =>
        selectedAnswer.quizId === props.quizId &&
        selectedAnswer.answer === answer
    );

    let answerStyle = {};
    if (isSelected) {
      answerStyle = {
        backgroundColor: "#D6DBF5",
        border: "none",
      };
    }
    return (
      <li
        key={answer}
        className="answer-list"
        style={answerStyle}
        onClick={() => props.onAnswerSelected(props.quizId, answer)}
      >
        {decode(answer)}
      </li>
    );
  });
  return <ul className="answers">{answerList}</ul>;
}

export default Answer;
