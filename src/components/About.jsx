import React from "react";
import UserClass from "./UserCard";

// Example of how to use the component
const About = () => {
    return (
        <div className="about-container">
            <div className="profiles-grid">
                <UserClass username="spector-0110" />
                <UserClass username="RaniAsmit" />
            </div>
        </div>
    );
};

export default About;
