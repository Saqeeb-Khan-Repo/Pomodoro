import { useEffect, useState, useRef } from "react";
import "./Pomodoro.css";

const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const speak = (text) => {
  if (!("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(WORK_SECONDS);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("work"); // "work" | "break"
  const intervalRef = useRef(null);

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  // Load state from localStorage on first mount
  useEffect(() => {
    const saved = localStorage.getItem("pomodoroState");
    if (!saved) return;

    try {
      const { savedMode, savedIsActive, targetTime } = JSON.parse(saved);
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((targetTime - now) / 1000));

      let base = savedMode === "work" ? WORK_SECONDS : BREAK_SECONDS;
      setMode(savedMode || "work");

      if (remaining <= 0) {
        // Session already ended
        setIsActive(false);
        setTimeLeft(base);
      } else {
        setTimeLeft(remaining);
        setIsActive(savedIsActive);
      }
    } catch (err) {
      // ignore corrupted storage
      speak("problem while countdown");
      console.log(err);
    }
  }, []);

  // Helper: save current state to localStorage
  const persistState = (nextMode, nextIsActive, nextTimeLeft) => {
    const duration = nextMode === "work" ? WORK_SECONDS : BREAK_SECONDS;
    const targetTime = Date.now() + nextTimeLeft * 1000;

    localStorage.setItem(
      "pomodoroState",
      JSON.stringify({
        savedMode: nextMode,
        savedIsActive: nextIsActive,
        targetTime,
        duration,
      }),
    );
  };

  const toggleTimer = () => {
    const nextIsActive = !isActive;
    setIsActive(nextIsActive);
    persistState(mode, nextIsActive, timeLeft);
  };

  const resetTimer = () => {
    const base = mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
    setIsActive(false);
    setTimeLeft(base);
    persistState(mode, false, base);
  };

  const manualSwitchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    const base = newMode === "work" ? WORK_SECONDS : BREAK_SECONDS;

    setMode(newMode);
    setIsActive(false);
    setTimeLeft(base);
    persistState(newMode, false, base);

    speak(
      newMode === "work"
        ? "Starting a 25 minute work session."
        : "Starting a 5 minute break.",
    );
  };

  // Main timer effect
  useEffect(() => {
    if (!isActive) {
      clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);

          if (mode === "work") {
            speak("Work session complete. Time for a 5 minute break.");
            const base = BREAK_SECONDS;
            setMode("break");
            setIsActive(false);
            setTimeLeft(base);
            persistState("break", false, base);
          } else {
            speak("Break is over. Back to a 25 minute work session.");
            const base = WORK_SECONDS;
            setMode("work");
            setIsActive(false);
            setTimeLeft(base);
            persistState("work", false, base);
          }

          return 0;
        }

        const next = prev - 1;
        persistState(mode, true, next);
        return next;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isActive, mode]);

  return (
    <div className="home-container">
      <h1 className="h2" style={{ textAlign: "center" }}>
        Pomodoro Timer
      </h1>

      <div className="timer-display">{formatTime(timeLeft)}</div>

      <div className="controls">
        <button onClick={toggleTimer}>{isActive ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={manualSwitchMode} disabled={isActive}>
          {mode === "work" ? "Short Break" : "Work Session"}
        </button>
      </div>

      <div className="container-li">
        <li>Pomodoro is a master focus technique:</li>
        <li>25-minute work sessions</li>
        <li>5-minute breaks</li>
      </div>
    </div>
  );
};

export default Pomodoro;
