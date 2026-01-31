import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect } from "react"; // Add useEffect
import { ClockLoader } from "react-spinners";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./Components/context/ThemeContext";
const App = () => {
  const NavBar = lazy(() => import("./Components/Header/NavBar"));
  const StopWatch = lazy(() => import("./Components/StopWatch"));
  const TimeZone = lazy(() => import("./Components/pages/TimeZone"));
  const Pomodoro = lazy(() => import("./Components/pages/Pomodoro"));
  const DailyPlanner = lazy(() => import("./Components/pages/DailyPlanner"));
  const LoginPage = lazy(() => import("./Components/pages/LoginPage"));
  const WorldTime = lazy(() => import("./Components/pages/WorldTime"));
  const SecondNavBar = lazy(() => import("./Components/Header/SecondNavBar"))

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading (or wait for API/images), then show app
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1500); // 1.5s loading screen

    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) {
    return (
      <div className="app-loader">
        <div className="loader-container">
          <ClockLoader color="#dee1ed" size={100} />
          <p className="loader-text">Loading Productivity Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <main>
      <ThemeProvider>
        <Suspense>
          <HashRouter>
            <NavBar />
            <SecondNavBar />
            <div className="app-main">
              <div className="app-content">
                <Routes>
                  <Route path="/" element={<Pomodoro />} />
                  <Route path="/timezone" element={<TimeZone />} />
                  <Route path="/pomodoro" element={<Pomodoro />} />
                  <Route path="/planner" element={<DailyPlanner />} />
                  <Route path="/worldtime" element={<WorldTime />} />
                  <Route path="/stopwatch" element={<StopWatch />} />
                  <Route path="/LoginPage" element={<LoginPage />} />
                </Routes>
              </div>
            </div>
          </HashRouter>
        </Suspense>
      </ThemeProvider>
      <footer className="footer">
        <h3 className="h3" style={{ textAlign: "center" }}>
          @2026 All Rights are Reserverd . Mr khan{" "}
        </h3>
      </footer>
    </main>
  );
};

export default App;
