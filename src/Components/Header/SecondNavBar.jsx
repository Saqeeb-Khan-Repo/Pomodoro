import { BiWorld } from "react-icons/bi";
import { GiTomato } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { GoClock } from "react-icons/go";
// import { FaClockRotateLeft } from "react-icons/fa6";
import { LuAlarmClockCheck } from "react-icons/lu";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { CiGift } from "react-icons/ci";
import { useTheme } from "../context/ThemeContext";

const SecondNavBar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="head head1">
      <nav>
        <Link className="login" to="/LoginPage">
          <CiGift className="gift" />
          Login/SignUp
        </Link>
      </nav>
      <div className="mode">
        <label>
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === "light"}
          />
          <span className="slider"></span>
        </label>
      </div>
    </header>
  );
};

export default SecondNavBar;
