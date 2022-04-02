import Question from "./Question";
import Answer from "./Answer";

function Quiz({ quizzes }) {
  const generateQuizzes = quizzes.map((quiz) => {
    return (
      <div className="quiz-post" key={quiz.id}>
        <Question key={quiz.question} id={quiz.id} question={quiz.question} />;
        <Answer key={quiz.answers.id} answers={quiz.answers} />
      </div>
    );
  });

  return (
    <main className="quiz-container">
      {generateQuizzes}
      <button className="btn-check">Check Answer</button>
    </main>
  );
}

export default Quiz;
