import { useEffect, useState } from "react";

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
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStarted]);

  return <div>{timer}</div>;
};

export default Timer;
