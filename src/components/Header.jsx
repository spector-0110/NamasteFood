import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useTheme } from "../context/ThemeProvider";
import { useOnlineStatus } from "../utils/useOnlineStatus";

const Header = () => {
    console.log("Header Rendered");
    const [btnName, setBtnName] = useState("Login");
    const { theme, toggleTheme } = useTheme();
    const isOnline=useOnlineStatus();

    return (
        <div className={`header ${theme === 'dark' ? 'header-dark' : ''}` }>
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
                            <Link to="/grocery">Grocery</Link>
                        </li>
                        <li>
                            {isOnline ? (
                                <span className="online-status">🟢 Online</span>
                            ) : (
                                <span className="offline-status">🔴 Offline</span>
                            )}
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