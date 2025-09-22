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

  const wordCount =
    inputValue.trim() === "" ? 0 : inputValue.trim().split(/\s+/).length;

  const charsCount = inputValue.replace(/\s/g, "").length;

  // 📌 وقتی تایمر صفر شد، این تابع اجرا میشه
  const handleTimeUp = () => {
    setIsStarted(false); // تایمر رو متوقف کن
    setInputValue(""); // متن تایپ شده پاک شود
    setTypingStatus(""); // وضعیت تایپ هم ریست شود
    setTotalChars(0);
  };

  return (
    <>
      <Navbar
        wordPerMin={wordCount}
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
        />
      </div>
    </>
  );
}

export default App;
