import { useEffect, useState } from "react";
import "./Timer.css";
import Modal from "../Modal/Modal";

interface TimerProps {
  isStarted: boolean;
  onTimeUp: () => void;
}

const Timer = ({ isStarted, onTimeUp }: TimerProps) => {
  const [timer, setTimer] = useState(60);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isStarted) {
      setTimer(60); // شروع دوباره
      setShowModal(false); // وقتی استارت خورد مدال بسته باشه
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            if (interval) clearInterval(interval);
            setShowModal(true); // ⬅️ وقتی تایمر صفر شد، مدال باز شود
            onTimeUp();
            return 0;
          }
        });
      }, 1000);
    } else {
      setTimer(60);
      setShowModal(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted, onTimeUp]);

  return (
    <>
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
          <div className="number dis_f c_fdc">
            <p className="number_timer">{timer}</p>
            <p className="sec_text">ثانیه</p>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>⏰ زمان شما تمام شد</h2>
          <p>امتحان تمام شد، لطفاً نتایج را بررسی کنید.</p>
        </Modal>
      )}
    </>
  );
};

export default Timer;
