import { GiTomato } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useTheme } from "../context/ThemeContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";


const SideBar = () => {
  const { theme, toggleTheme , setIsOpen , isOpen } = useTheme();
 
  return (
    <>
      <header className="head head1">
        <nav>
          <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <GiHamburgerMenu />
          </button>
          <Link to="/pomodoro">
            <GiTomato />
            Pomodoro
          </Link>
           <Link to="/planner">
                    <SlCalender />
                    Daily Planner
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
    </>
  );
};

export default SideBar;
