function Answer(props) {
  const generateAnswer = props.answers.map((element) => {
    return (
      <li
        id={element.id}
        className="answer-list"
        key={element.id}
        onClick={() => props.holdAnswer(element.id)}
      >
        {element.answer}
      </li>
    );
  });

  return <ul className="answers">{generateAnswer}</ul>;
}

export default Answer;
