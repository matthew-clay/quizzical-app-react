import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Post from "./Post";

function Quiz() {
  const [quiz, setQuiz] = useState([]);

  // console.log("quiz-state", quiz);

  useEffect(() => {
    const url = "https://opentdb.com/api.php?amount=5&type=multiple";
    const getDataFromAPI = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setQuiz(generateQuiz(json.results));
    };
    getDataFromAPI();
  }, []);

  const generateQuiz = (apiData) => {
    let newData = [];
    apiData.forEach((data) => {
      newData.push({
        id: nanoid(),
        isChose: false,
        question: data.question,
        correctAnswer: data.correct_answer,
        incorrectAnswer: data.incorrect_answers,
      });
    });
    return newData;
  };

  const handleCheck = () => {
    console.log("checked answers...");
  };

  const handleChoice = (id) => {
    console.log("You chose..", id);
  };
  return (
    <section className="quiz-container">
      <Post quiz={quiz} handleChoice={handleChoice} />
      {quiz.length !== 0 && (
        <button className="btn-check" onClick={handleCheck}>
          Check Answers
        </button>
      )}
    </section>
  );
}

export default Quiz;
