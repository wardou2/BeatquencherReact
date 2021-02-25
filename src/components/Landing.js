import React from "react";
import { withRouter } from "react-router-dom";

import Login from "./Login";
import StyledButton from "./StyledButton";
import AboutModal from "./AboutModal";

import "../images/landing-background.jpg";
import "../styles/landing.css";

const Landing = ({ getUser, startDemo, history }) => {
    return (
        <div className="landing-container">
            <div className="landing-child">
                <div className="landing-header">
                    <p>BEATQUENCHER</p>
                </div>
                <div>
                    <div className="landing-button-wrapper">
                        <StyledButton callback={() => startDemo(history)}>
                            DEMO WITHOUT LOGGING IN
                        </StyledButton>
                    </div>
                    <div className="landing-button-wrapper">
                        <Login getUser={getUser} />
                    </div>
                </div>
            </div>
            <div className="landing-about-container">
                <AboutModal />
            </div>
        </div>
    );
};

export default withRouter(Landing);
