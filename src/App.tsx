import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Timer from "./components/Timer/Timer";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isStarted, setIsStarted] = useState(false);

  const wordCount =
    inputValue.trim() === "" ? 0 : inputValue.trim().split(/\s+/).length;

  const charsCount = inputValue.replace(/\s/g, "").length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (!isStarted && e.target.value.length > 0) {
      setIsStarted(true);
    }
  };

  return (
    <>
      <Navbar wordPerMin={wordCount} charsPerMin={charsCount} />
      <div className="timer_container">
        <Timer isStarted={isStarted} />
      </div>

      <div className="main_input">
        <div className="input_container">
          <input
            type="text"
            placeholder="Type something..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
}

export default App;
