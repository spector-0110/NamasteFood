import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { ThemeContext } from "../context/ThemeProvider";

const Header = () => {
    const [btnName, setBtnName] = useState("Login");
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <div className={`header ${theme === 'dark' ? 'header-dark' : ''}`}>
            <div className="header-content">
                <div className="logo-container">
                    <Link to="/">
                        <img className="logo" src={LOGO_URL} alt="logo" />
                    </Link>
                </div>
                <div className="nav-items">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        <li>
                            <button
                                className="login-btn"
                                onClick={() => {
                                    btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                                }}
                            >
                                {btnName}
                            </button>
                        </li>
                        <li>
                            <button
                                className="theme-btn"
                                onClick={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
                            >
                                {theme === 'dark' ? '☀️' : '🌙'}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;