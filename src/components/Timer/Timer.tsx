import { useEffect, useState } from "react";
import "./Timer.css";

interface TimerProps {
  isStarted: boolean;
}

const Timer = ({ isStarted }: TimerProps) => {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            if (interval) clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    } else {
      setTimer(60);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted]);

  return (
    <div className="timer_card">
      <div className="timer">
        <div className={`dot ${isStarted ? "animateDot" : ""}`}></div>{" "}
        <svg>
          <circle cx="70" cy="70" r="70"></circle>
          <circle
            cx="70"
            cy="70"
            r="70"
            className={isStarted ? "animateCircle" : ""}
          ></circle>
        </svg>
        <div className="number">{timer}</div>
      </div>
    </div>
  );
};

export default Timer;
