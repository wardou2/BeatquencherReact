/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Login from "./Login";
import StyledButton from "./StyledButton";

import "../styles/navbar.css";

class Navbar extends Component {
    constructor(props) {
        super();
        this.state = {
            isFirefox: typeof InstallTrigger !== "undefined",
        };
    }

    isEmpty = (obj) => {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    };

    showLoginLogout = () => {
        return this.props.loggedIn ? (
            <StyledButton callback={this.props.logOut}>Logout</StyledButton>
        ) : (
            <Login getUser={this.props.getUser} />
        );
    };

    getRoute = () => {
        if (this.props.location.state?.from === "/projects/") {
            return (
                <div
                    onClick={() => this.props.history.goBack()}
                    className="navbar-link"
                >
                    <Icon name="arrow left" />
                    Projects
                </div>
            );
        }
        if (this.props.location.state?.from.includes("/projects/")) {
            return (
                <div
                    onClick={() => this.props.history.goBack()}
                    className="navbar-link"
                >
                    <Icon name="arrow left" />
                    Scenes
                </div>
            );
        }

        return (
            <div>
                <Icon name="headphones" />
            </div>
        );
    };

    render() {
        return (
            <div className="navbar">
                <div className="navbar-links">
                    {this.getRoute()}
                    {this.state.isFirefox && (
                        <div className="navbar-warning">
                            <h5>Warning:</h5>
                            This web app is sluggish on Firefox due to its
                            implementation of the Web Audio API. See{" "}
                            <a
                                href="https://github.com/Tonejs/Tone.js/issues/534"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                this github issue.
                            </a>
                        </div>
                    )}
                </div>

                <div className="navbar-title">
                    <h1 className="glow">
                        {!this.isEmpty(this.props.currentProj)
                            ? this.props.currentProj.title
                            : "BEATQUENCHER"}
                    </h1>
                </div>
                <div
                    className="navbar-loginlogout"
                    onClick={this.toggleMenuVisible}
                >
                    {this.showLoginLogout()}
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar);
