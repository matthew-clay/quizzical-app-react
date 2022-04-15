import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Welcome from "./component/Welcome";
// import Quiz from "./component/Quiz";
import Question from "./component/Question";
import "./App.css";
import { decode } from "html-entities";

function App() {
  const [welcome, setWelcome] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  const [newGame, setNewGame] = useState(false);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    setWelcome((prev) => !prev);
  };

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuizzes(customizeAPIData(data.results)))
      .catch((error) => alert("Error while fetching data:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newGame]);

  const customizeAPIData = (rawData) => {
    const newQuizzes = rawData.map((quiz) => {
      const answers = [...quiz.incorrect_answers, quiz.correct_answer];
      return {
        id: nanoid(),
        question: decode(quiz.question),
        correctAnswer: quiz.correct_answer,
        answers: customizeAnswerFromQuiz(
          answers,
          quiz.correct_answer,
          shuffledAnswer
        ),
      };
    });
    return newQuizzes;
  };

  const shuffledAnswer = (answers) => {
    return answers.sort(() => Math.random() - 0.5);
  };

  const customizeAnswerFromQuiz = (ansArr, correctAnswer, callback) => {
    const answers = callback(decode(ansArr));

    return answers.map((answer) => ({
      id: nanoid(),
      answer: answer,
      isCorrect: answer === correctAnswer,
      isHeld: false,
      heldCorrect: false,
      heldIncorrect: false,
      checked: false,
    }));
  };

  const runHold = (questionId, answerId) => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => {
        if (quiz.id === questionId) {
          const answerList = quiz.answers.map((answer) => {
            console.log(answer.id === answerId || answer.isHeld);
            if (answer.id === answerId || answer.isHeld) {
              return {
                ...answer,
                isHeld: !answer.isHeld,
              };
            } else {
              return answer;
            }
          });
          return {
            ...quiz,
            answers: answerList,
          };
        } else {
          return quiz;
        }
      })
    );
  };

  const checkAnswers = () => {
    setQuizzes((prevQuizzes) =>
      prevQuizzes.map((quiz) => {
        const checkedAnswer = quiz.answers.map((answer) => {
          if (answer.isHeld && !answer.correct) {
            return {
              ...answer,
              heldIncorrect: true,
              checked: true,
            };
          } else if (answer.isHeld && answer.correct) {
            setScore((prevScore) => prevScore + 1);
            return {
              ...answer,
              heldCorrect: true,
              checked: true,
            };
          } else {
            return {
              ...answer,
              checked: true,
            };
          }
        });
        return {
          ...quiz,
          answers: checkedAnswer,
        };
      })
    );
    setChecked(true);
  };

  const questionTags = quizzes.map((quiz) => {
    return (
      <Question
        id={quiz.id}
        key={quiz.id}
        question={quiz.question}
        answers={quiz.answers}
        runHold={runHold}
      />
    );
  });

  const playNewGame = () => {
    setNewGame((prevVal) => !prevVal);
    setChecked(false);
    setScore(0);
  };

  return (
    <section className="app">
      {welcome ? (
        <Welcome handleClick={handleClick} />
      ) : (
        <main className="quiz-container">
          {questionTags}
          <div className="btn-container">
            {checked ? (
              <div>
                <span className="score">
                  You scored {score}/5 correct answers
                </span>
                <button className="btn mt" onClick={playNewGame}>
                  Play again
                </button>
              </div>
            ) : (
              <button className="btn mt" onClick={checkAnswers}>
                Check answers
              </button>
            )}
          </div>
        </main>
      )}
    </section>
  );
}

export default App;
