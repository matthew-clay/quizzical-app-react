import React from "react";
import "./App.css";
import Question from "./component/Question";
import { nanoid } from "nanoid";

export default function App() {
  const [welcome, setWelcome] = React.useState(true);
  const [questions, setQuestions] = React.useState([]);
  const [game, setGame] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [score, setScore] = React.useState(0);

  function handleClick() {
    setWelcome((prevVal) => !prevVal);
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(getNewQuestions(data.results));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game]);

  const getNewQuestions = (listOfQuestions) => {
    const resetQuestions = listOfQuestions.map((question) => {
      return {
        id: nanoid(),
        question: question.question,
        correctAnswer: question.correct_answer,
        answers: settingAnswers(
          shuffleAnswers([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          question.correct_answer
        ),
      };
    });
    return resetQuestions;
  };

  const settingAnswers = (listOfAnswers, correctAnswer) => {
    return listOfAnswers.map((answer) => {
      return {
        isHeld: false,
        answer: answer,
        correct: answer === correctAnswer ? true : false,
        id: nanoid(),
        heldCorrect: false,
        heldIncorrect: false,
        checked: false,
      };
    });
  };

  const shuffleAnswers = (answerList) => {
    return answerList.sort(() => Math.random() - 0.5);
  };

  const runHold = (answerId, questionId) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        if (question.id === questionId) {
          const answersList = question.answers.map((answer) => {
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
            ...question,
            answers: answersList,
          };
        } else {
          return question;
        }
      })
    );
  };

  const questionEls = questions.map((question) => {
    return (
      <Question
        id={question.id}
        key={question.id}
        question={question.question}
        answers={question.answers}
        runHold={runHold}
      />
    );
  });

  const checkAnswers = () => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        const checkedAnswers = question.answers.map((answer) => {
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
          ...question,
          answers: checkedAnswers,
        };
      })
    );
    setChecked(true);
  };

  const newGame = () => {
    setGame((prevVal) => !prevVal);
    setChecked(false);
    setScore(0);
  };

  return (
    <div>
      {welcome ? (
        <menu className="container">
          <h1 className="container--title">Quizzical</h1>
          <p className="container--description">
            Fancy practising your geography trivia?
          </p>
          <button className="container--button" onClick={handleClick}>
            Start quiz
          </button>
        </menu>
      ) : (
        <main>
          {questionEls}
          <div className="btn--container">
            {checked ? (
              <div>
                <span className="score">
                  You scored {score}/5 correct answers
                </span>
                <button onClick={newGame}>Play again</button>
              </div>
            ) : (
              <button onClick={checkAnswers}>Check answers</button>
            )}
          </div>
        </main>
      )}
    </div>
  );
}
