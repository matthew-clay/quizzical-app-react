import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Preview from "./component/Preview";
import Quiz from "./component/Quiz";

function App() {
  const [isStart, setStart] = useState(false);

  const handleStart = () => {
    setStart((prevValue) => !prevValue);
  };

  if (isStart) {
    document.querySelector(".preview").style.display = "none";
  }

  return (
    <main>
      <div className="container">
        <Preview handleStart={handleStart} />
        {isStart && <Quiz />}
      </div>
    </main>
  );
}

export default App;
