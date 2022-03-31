import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./component/Welcome";
import Quiz from "./component/Quiz";

function App() {
  const [welcome, setWelcome] = useState(true);

  // function for welcome page...
  const handleStart = () => {
    setWelcome((prevValue) => !prevValue);
  };

  return <main>{welcome && <Welcome handleStart={handleStart} />}</main>;
}

export default App;
