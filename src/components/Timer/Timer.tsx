import { useEffect, useRef, useState } from "react";
import "./Timer.css";
import Modal from "../Modal/Modal";

interface TimerProps {
  isStarted: boolean;
  onTimeUp: () => void;
}

const Timer = ({ isStarted, onTimeUp }: TimerProps) => {
  const [time, setTime] = useState(60);
  const [showModal, setShowModal] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // فقط وقتی isStarted از false به true تغییر کرد، تایمر شروع بشه
  useEffect(() => {
    if (isStarted && !intervalRef.current) {
      setShowModal(false);

      intervalRef.current = setInterval(() => {
        setTime((prev) => {
          if (prev > 1) {
            return prev - 1;
          } else {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setShowModal(true);
            onTimeUp();
            return 0;
          }
        });
      }, 1000);
    }

    if (!isStarted) {
      // وقتی کاربر ریست یا تایمر قطع شد
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setTime(60);
      setShowModal(false);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isStarted]); // 🚨 فقط وابسته به isStarted

  return (
    <>
      <div className="timer_card">
        <div className="timer">
          <div className={`dot ${isStarted ? "animateDot" : ""}`}></div>
          <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle
              cx="70"
              cy="70"
              r="70"
              className={isStarted ? "animateCircle" : ""}
            ></circle>
          </svg>
          <div className="number dis_f c_fdc">
            <p className="number_timer">{time}</p>
            <p className="sec_text">ثانیه</p>
          </div>
        </div>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>⏰ زمان شما تمام شد</h2>
          <p>امتحان به پایان رسید، لطفاً نتایج خود را بررسی کنید.</p>
        </Modal>
      )}
    </>
  );
};

export default Timer;
