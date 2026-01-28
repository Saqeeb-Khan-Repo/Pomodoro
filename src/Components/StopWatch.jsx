import "./StopWatch.css";
import { useState, useRef } from "react";

const StopWatch = () => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const start = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 10);
    }, 10);
    setIsActive(true);
  };
  const stop = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsActive(false);
  };
  const reset = () => {
    stop();
    setTime(0);
    setIsActive(false);
  };
  return (
    <>
      <div className="container">
        <h1 className="h2">StopWatch</h1>
        <h1 className="h1">{formatTime(time)}</h1>
        <div className="stopwatch">
          <button onClick={start} disabled={isActive}>
            Start
          </button>
          <button onClick={stop} disabled={!isActive}>
            Stop
          </button>
          <button onClick={reset}>Reset</button>
        </div>
      </div>
    </>
  );
};
function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return `${minutes}:${seconds}:${milliseconds}`;
}

export default StopWatch;
