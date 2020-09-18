/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Icon, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import Login from "./Login";

class Navbar extends Component {
    isEmpty = (obj) => {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    };

    showLoginLogout = () => {
        return this.props.loggedIn ? (
            <a onClick={this.props.logOut} className="nav-links">
                Logout
            </a>
        ) : (
            <Login getUser={this.props.getUser} />
        );
    };

    getRoute = () => {
        if (this.props.location.state?.from === "/projects/") {
            return (
                <a
                    onClick={() => this.props.history.goBack()}
                    className="nav-links"
                >
                    <Icon name="arrow alternate circle left outline" />
                    Projects
                </a>
            );
        }
        if (this.props.location.state?.from.includes("/projects/")) {
            return (
                <a
                    onClick={() => this.props.history.goBack()}
                    className="nav-links"
                >
                    <Icon name="arrow alternate circle left outline" />
                    Scenes
                </a>
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
                <div className="blank-div">{this.getRoute()}</div>
                <div className="nav-title">
                    <Header as="h1" className="glow">
                        {!this.isEmpty(this.props.currentProj)
                            ? this.props.currentProj.title
                            : "Beatquencher"}
                    </Header>
                </div>
                <div
                    className="navbar-links"
                    id="js-navbar-toggle"
                    onClick={this.toggleMenuVisible}
                >
                    {this.showLoginLogout()}
                </div>
            </div>
        );
    }
}

export default withRouter(Navbar);
