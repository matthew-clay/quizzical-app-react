import { decode } from "html-entities";
import Answer from "./Answer";
import Question from "./Question";

function Quiz(props) {
  const generateQuizzes = props.quizzes.map((quiz) => {
    const newAnswers = quiz.answers.sort();
    return (
      <div className="quiz-post" key={quiz.id}>
        <Question question={decode(quiz.question)} />
        <Answer
          answers={newAnswers}
          correct_answer={quiz.correct_answer}
          selectedAnswers={props.selectedAnswers}
          onAnswerSelected={props.onAnswerSelected}
          quizId={quiz.id}
          correctAnswers={props.correctAnswers}
        />
      </div>
    );
  });

  return (
    <main className="quiz-container">
      <>{generateQuizzes}</>
      {props.checked ? (
        <div className="score-container">
          <span className="score">
            You scored {props.score}/5 correct answers
          </span>
          <button className="btn mt" onClick={props.startNewGame}>
            Play again
          </button>
        </div>
      ) : (
        <button
          className="btn mt"
          onClick={() =>
            props.handleCheckAnswers(props.quizzes.map((quiz) => quiz.id))
          }
        >
          Check Answers
        </button>
      )}
    </main>
  );
}

export default Quiz;
