import Question from "./Question";
import Answer from "./Answer";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { decode } from "html-entities";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  // const [newGame, setNewGame] = useState(false);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

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
        question: decode(data.question),
        correctAns: decode(data.correct_answer),
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
        answer: decode(answer),
        correct_ans: answer === correctAnswer,
        isHeld: false,
        heldCorrect: false,
        heldIncorrect: false,
        checked: false,
      };
    });
  };

  const shuffleAnsFromAPI = (ansArr) => {
    return ansArr.sort((a, b) => Math.random() - 0.5);
  };

  const holdAnswer = (id) => {
    console.log(id);
  };

  const handleCheck = () => {
    setChecked((prevValue) => !prevValue);
  };

  const generateQuizzes = quizzes.map((quiz) => {
    return (
      <div className="quiz-post" key={quiz.id}>
        <Question key={quiz.question} question={quiz.question} />
        <Answer
          key={quiz.answers.id}
          answers={quiz.answers}
          holdAnswer={holdAnswer}
        />
      </div>
    );
  });

  return (
    <main className="quiz-container">
      {generateQuizzes}
      {!checked ? (
        <button className="btn mt" onClick={handleCheck}>
          Check Answers
        </button>
      ) : (
        <div className="score-container mt">
          <span className="score">
            You scored {score}/{quizzes.length} correct answer
            {score > 1 && "s."}
          </span>
          <button className="btn" onClick={handleCheck}>
            Play Again?
          </button>
        </div>
      )}
    </main>
  );
}

export default Quiz;
