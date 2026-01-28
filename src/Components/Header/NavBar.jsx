import { BiWorld } from "react-icons/bi";
import { GiTomato } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
// import { FaClockRotateLeft } from "react-icons/fa6";
import { LuAlarmClockCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./NavBar.css";

const SideBar = () => {
  return (
    <header className="head head1">
      <nav>
        <Link to="/timezone">
          <BiWorld /> TimeZone
        </Link>
        <Link to="/pomodoro">
          <GiTomato />
          Pomodoro
        </Link>
        <Link to="/planner">
          <SlCalender />
          Daily Planner
        </Link>
        <Link to="/worldtime">
          <GoClock /> World Time
        </Link>
        {/* <Link to="/timer">
          <FaClockRotateLeft /> Timer
        </Link> */}
        <Link to="/stopwatch">
          <LuAlarmClockCheck /> StopWatch
        </Link>
      </nav>
    </header>
  );
};

export default SideBar;
