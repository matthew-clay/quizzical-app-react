import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import Welcome from "./components/Welcome";

function App() {
  const [isStart, setStart] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswer] = useState([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  // console.log("selected Ans:", selectedAnswers);
  console.log("Quiz:", quizData);

  const handleStart = () => {
    setStart((oldValue) => !oldValue);
  };

  const onAnswerSelected = (quizId, answer) => {
    const hasAnsweredBefore = selectedAnswers.find(
      (selectedAnswer) => selectedAnswer.quizId === quizId
    );
    if (hasAnsweredBefore) {
      const filtered = selectedAnswers.filter(
        (selectedAnswer) => selectedAnswer.quizId !== quizId
      );
      return setSelectedAnswer([...filtered, { quizId, answer }]);
    }
    setSelectedAnswer([...selectedAnswers, { quizId, answer }]);
  };

  useEffect(() => {
    try {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then((res) => res.json())
        .then((data) =>
          setQuizData(
            data.results.map((quiz) => ({
              ...quiz,
              id: nanoid(),
              question: quiz.question,
              answers: [...quiz.incorrect_answers, quiz.correct_answer],
            }))
          )
        );
    } catch (error) {
      console.log("Fetch Error:", error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStart]); // temporarily controls dependcies arr with boolean type later will fixed with new state

  const handleCheckAnswers = (quizId) => {
    return quizId.map((id) => {
      setChecked((oldValue) => !oldValue);
      quizData.map((quiz) => {
        if (id === quiz.id) {
          selectedAnswers.map((item) => {
            if (item.answer === quiz.correct_answer) {
              return setScore((oldScore) => oldScore + 1);
            } else {
              return score;
            }
          });
        }
        return quiz;
      });
      return id;
    });
  };

  const startNewGame = () => {
    setStart((prevVal) => !prevVal);
    setChecked(false);
    setScore(0);
  };

  return (
    <section className="app">
      {isStart ? (
        <Quiz
          quizzes={quizData}
          selectedAnswers={selectedAnswers}
          onAnswerSelected={onAnswerSelected}
          score={score}
          checked={checked}
          handleCheckAnswers={handleCheckAnswers}
          startNewGame={startNewGame}
        />
      ) : (
        <Welcome handleStart={handleStart} />
      )}
    </section>
  );
}

export default App;
