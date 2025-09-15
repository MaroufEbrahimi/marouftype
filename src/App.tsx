import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Timer from "./components/Timer/Timer";
import Input from "./components/Input/Input";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const wordCount =
    inputValue.trim() === "" ? 0 : inputValue.trim().split(/\s+/).length;

  const charsCount = inputValue.replace(/\s/g, "").length;

  return (
    <>
      <Navbar wordPerMin={wordCount} charsPerMin={charsCount} />
      <div className="timer_container">
        <Timer isStarted={isStarted} />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          isStarted={isStarted}
          setIsStarted={setIsStarted}
        />
      </div>
    </>
  );
}

export default App;
