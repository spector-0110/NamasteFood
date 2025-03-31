import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

const Header = () => {

    const initBtnName= "Login";
    const [btnName , setBtnName]= useState(initBtnName);

    function onClick() {
        if(btnName==="Login") setBtnName("Logout");
        else setBtnName("Login");
    }

    return (
        <div className="header">
            <div className="logo-container">
                <img 
                    className="logo" 
                    src={LOGO_URL} 
                    alt="Logo"
                />
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button 
                        onClick={() => {
                            onClick();
                        }}>
                        {btnName}
                    </button>
                </ul>
            </div>
        </div>
    );
};

export default Header;