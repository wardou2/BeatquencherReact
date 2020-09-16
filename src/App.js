import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter,
} from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import Cookies from "js-cookie";
import history from "./components/history";

import "./App.css";
import Auth from "./components/Auth";
import Dashboard from "./containers/Dashboard";
import { getUser } from "./api/User";

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
        /** Fetch user details if cookies stored */
        if (Cookies.get("token") && Cookies.get("user_id")) {
            this.getUser(Cookies.get("user_id"));
        }
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
            Cookies.remove("token");
            throw response;
        }
        return response.json();
    };

    logOut = () => {};

    getUser(id) {
        // TODO: Handle Error
        getUser(id)
            .then(this.setCurrentUser)
            .catch((err) => console.log(err));
    }

    render() {
        const DashboardWithRouter = withRouter(Dashboard);
        return (
            <Router history={history}>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                {/* {!this.state.loggedIn ? (
                    <Redirect to="/login" />
                ) : (
                    <Redirect to="/projects" />
                )} */}

                <div className="fill-page">
                    <Route
                        exact
                        path="/login"
                        render={(props) => (
                            <Auth
                                setCurrentUser={this.setCurrentUser}
                                setLoading={this.setLoading}
                                dispalayError={this.state.displayError}
                            />
                        )}
                    />
                    <Route
                        path="/"
                        render={(props) => (
                            <DashboardWithRouter
                                currentUser={this.state.currentUser}
                                loggedIn={this.state.loggedIn}
                                logOut={this.logOut}
                                setCurrentUser={this.setCurrentUser}
                                getUser={this.getUser}
                                history={history}
                            />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
