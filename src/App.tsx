import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Timer from "./components/Timer/Timer";
import Input from "./components/Input/Input";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [typingStatus, setTypingStatus] = useState("");
  const [totalChars, setTotalChars] = useState(0);
  const [totalWordsTyped, setTotalWordsTyped] = useState(0); // ✅ اینو اضافه کن

  // 📌 وقتی تایمر صفر شد، این تابع اجرا میشه
  const handleTimeUp = () => {
    setIsStarted(false);
    setInputValue("");
    setTypingStatus("");
    setTotalChars(0);
    setTotalWordsTyped(0); // ✅ ریست بشه
  };

  return (
    <>
      <Navbar
        wordPerMin={totalWordsTyped} // ✅ الان شناخته میشه
        charsPerMin={totalChars}
        typingStatus={typingStatus}
      />
      <div className="timer_container">
        <Timer isStarted={isStarted} onTimeUp={handleTimeUp} />
      </div>

      <div style={{ marginBottom: "30px" }}>
        <Input
          inputValue={inputValue}
          setInputValue={setInputValue}
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          setTypingStatus={setTypingStatus}
          setTotalChars={setTotalChars}
          setTotalWordsTyped={setTotalWordsTyped}
        />
      </div>
    </>
  );
}

export default App;
