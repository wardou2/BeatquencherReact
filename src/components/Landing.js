import React from "react";
import { withRouter } from "react-router-dom";

import Login from "./Login";
import StyledButton from "./StyledButton";

import "../styles/landing.css";

const Landing = ({ getUser, startDemo, history }) => {
    return (
        <div className="landing-container">
            <div className="landing-child">
                <div className="landing-header glow">BEATQUENCHER</div>
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
        </div>
    );
};

export default withRouter(Landing);
