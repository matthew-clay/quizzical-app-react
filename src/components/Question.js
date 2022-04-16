function Question(props) {
  return (
    <h3 className="question" key={props.id}>
      {props.question}
    </h3>
  );
}

export default Question;
