function Answer(props) {
  let answerStyle = {};

  if (props.checked && props.isCorrect) {
    answerStyle = {
      backgroundColor: "#94D7A2",
      border: "none",
    };
  } else if (props.checked && props.heldIncorrect) {
    answerStyle = {
      backgroundColor: "#F8BCBC",
      opacity: 0.5,
      border: "none",
    };
  } else {
    answerStyle = {
      backgroundColor: props.isHeld ? "#D6DBF5" : "white",
      cursor: "pointer",
    };
  }

  return (
    <li
      className="answer-list"
      key={props.id}
      style={answerStyle}
      onClick={props.runHold}
    >
      {props.answer}
    </li>
  );
}

export default Answer;
