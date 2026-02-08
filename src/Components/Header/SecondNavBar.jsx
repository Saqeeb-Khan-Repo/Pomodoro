import { GoClock } from "react-icons/go";
import { LuAlarmClockCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./NavBar.css";
// import { CiGift } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext";
import { RxCross1 } from "react-icons/rx";
import { BiWorld } from "react-icons/bi";

const SecondNavBar = () => {
  const { isOpen, setIsOpen } = useTheme();

  return (
    <header className={`sideContainer sidebar ${isOpen ? "open" : ""}`}>
      <nav>
        <button className="cross" onClick={() => setIsOpen(false)}>
          <RxCross1 />
        </button>
        <Link to="/timezone">
          <BiWorld /> TimeZone
        </Link>
        <Link to="/worldtime">
          <GoClock /> World Time
        </Link>
        <Link to="/stopwatch">
          <LuAlarmClockCheck /> StopWatch
        </Link>
        {/* <Link className="login" to="/LoginPage">
          <CiGift className="gift" />
          Login/SignUp
        </Link> */}
      </nav>
    </header>
  );
};

export default SecondNavBar;
