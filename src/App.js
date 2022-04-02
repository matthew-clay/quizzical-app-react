import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./component/Welcome";
import Quiz from "./component/Quiz";

function App() {
  const [welcome, setWelcome] = useState(true);
  const [quizzes, setQuizzes] = useState([]);
  // const [checked, setChecked] = useState(false);

  // function for welcome page...
  const handleStart = () => {
    setWelcome((prevValue) => !prevValue);
  };

  console.log(quizzes);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((data) => setQuizzes(generateQuizzesFromAPI(data.results)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change the format we want from returned api-Data ( => id, answers = incorrect_ans + correct_ans)
  const generateQuizzesFromAPI = (apiData) => {
    return apiData.map((data) => {
      const allAnswers = [...data.incorrect_answers, data.correct_answer];
      return {
        id: nanoid(),
        question: data.question,
        correctAns: data.correct_answer,
        answers: settingAllAnsFromAPI(
          data.correct_answer, // check correct_answer condition
          allAnswers, // callback param
          shuffleAnsFromAPI // callback fn
        ),
      };
    });
  };

  const settingAllAnsFromAPI = (correctAnswer, ansArr, callback) => {
    const newAnsArr = callback(ansArr);

    return newAnsArr.map((answer) => {
      return {
        id: nanoid(),
        answer: answer,
        correct_ans: answer === correctAnswer,
      };
    });
  };

  const shuffleAnsFromAPI = (ansArr) => {
    return ansArr.sort((a, b) => Math.random() - 0.5);
  };

  return (
    <section>
      {welcome ? (
        <Welcome handleStart={handleStart} />
      ) : (
        <Quiz quizzes={quizzes} key={quizzes.id} />
      )}
    </section>
  );
}

export default App;
