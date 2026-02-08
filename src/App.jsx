import { Routes, Route, HashRouter } from "react-router-dom";
import { useState, useEffect } from "react"; // Add useEffect
import { ClockLoader } from "react-spinners";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./Components/context/ThemeContext";
import Footer from "./Components/pages/Footer";
const App = () => {
  const NavBar = lazy(() => import("./Components/Header/NavBar"));
  const StopWatch = lazy(() => import("./Components/StopWatch"));
  const TimeZone = lazy(() => import("./Components/pages/TimeZone"));
  const Pomodoro = lazy(() => import("./Components/pages/Pomodoro"));
  const DailyPlanner = lazy(() => import("./Components/pages/DailyPlanner"));
  const LoginPage = lazy(() => import("./Components/pages/LoginPage"));
  const WorldTime = lazy(() => import("./Components/pages/WorldTime"));
  const SecondNavBar = lazy(() => import("./Components/Header/SecondNavBar"));

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading (or wait for API/images), then show app
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800); // 1.5s loading screen

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
      <Footer />
    </main>
  );
};

export default App;
