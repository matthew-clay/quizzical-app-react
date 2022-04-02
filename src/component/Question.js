function Question(props) {
  return (
    <span className="question" key={props.id}>
      {props.question}
    </span>
  );
}

export default Question;
