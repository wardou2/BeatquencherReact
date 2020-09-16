import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter,
    Switch,
} from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import Cookies from "js-cookie";

import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./containers/Dashboard";
import BASE_URL from "./api_url";
import history from "./components/history";

const USERS_URL = `${BASE_URL}users/`;

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {},
            displayError: "",
            loggedIn: false,
            loading: false,
        };

        this.getUser = this.getUser.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        window.gapi.load("auth2", () => {
            window.gapi.auth2.init();
        });
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    setLoading(boo) {
        this.setState({
            loading: boo,
        });
    }

    setCurrentUser(user) {
        this.setState({ currentUser: user, loggedIn: true });
    }

    handleErrors = (response) => {
        if (!response.ok) {
            this.setState({ displayError: true, loggedIn: false });
            Cookies.remove("id_token");
            throw response;
        }
        return response.json();
    };

    logOut = () => {
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            Cookies.remove("id_token");
            Cookies.remove("email");
            this.setState({ loggedIn: false });
        });
    };

    getUser() {
        const email = Cookies.get("email").toLowerCase();
        fetch(`${USERS_URL}find`, {
            method: "PUT",
            headers: {
                id_token: Cookies.get("id_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
            .then((res) => this.handleErrors(res))
            .then((json) => this.setCurrentUser(json))
            .catch((error) => {
                error.text().then((errorMessage) => {
                    this.setState({ displayError: errorMessage });
                });
            });
    }

    render() {
        const DashboardWithRouter = withRouter(Dashboard);

        return (
            <Router>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                {!this.state.loggedIn ? (
                    <Redirect to="/login" />
                ) : (
                    <Redirect to="/projects" />
                )}

                <div className="fill-page">
                    <Switch>
                        <Route path="/login">
                            <Auth
                                setCurrentUser={this.setCurrentUser}
                                setLoading={this.setLoading}
                                dispalayError={this.state.displayError}
                            />
                        </Route>

                        <Route path="/">
                            <DashboardWithRouter
                                currentUser={this.state.currentUser}
                                loggedIn={this.state.loggedIn}
                                logOut={this.logOut}
                            />
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
