import "./Footer.css";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <h3 className="h3" style={{ textAlign: "center" }}>
        @2026 All Rights are Reserverd . Mr khan{" "}
      </h3>
      <div className="footer-container">
        <a href="https://www.linkedin.com/in/saqeebkhan?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Saqeeb-Khan-Repo">
          <FaSquareGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
