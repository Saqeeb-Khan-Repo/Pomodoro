import { useState, useEffect, useRef } from "react";
import "./Pomodoro.css";

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work"); // "work" or "break"
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "work" ? 25 * 60 : 5 * 60);
  };

  const switchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setTimeLeft(newMode === "work" ? 25 * 60 : 5 * 60);
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            setIsActive(false);
            alert(mode === "work" ? "Time for a break!" : "Back to work!");
            return prev;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isActive]);

  return (
    <div className="home-container">
      <h1 className="h2" style={{ textAlign: "center" }}>
        Pomodoro Timer
      </h1>
      <div className="timer-display">{formatTime(timeLeft)}</div>
      <div className="controls">
        <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={switchMode} disabled={isActive}>
          {mode === "work" ? "Short Break" : "Work Session"}
        </button>
      </div>
      <div className="container-li">
        <li>Pomodoro is an Master focused Technique:</li>
        <li> 25-minute work sessions</li>
        <li> 5-minute breaks</li>
      </div>
    </div>
  );
};

export default Pomodoro;
