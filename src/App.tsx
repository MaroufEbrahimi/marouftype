import { useState } from "react";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState("");

  const wordCount =
    inputValue.trim() === "" ? 0 : inputValue.trim().split(/\s+/).length;

  return (
    <>
      <div className="input_container">
        <input
          autoFocus
          type="text"
          placeholder="Type something..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <p>You typed: {`${wordCount} ${wordCount >= 2 ? "words" : "word"}`}</p>
    </>
  );
}

export default App;
