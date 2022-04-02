function Answer(props) {
  const generateAnswer = props.answers.map((element) => {
    return (
      <li className="answer-list" key={element.id}>
        {element.answer}
      </li>
    );
  });

  return <ul className="answers">{generateAnswer}</ul>;
}

export default Answer;
