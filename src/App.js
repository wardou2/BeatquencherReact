import React, { Component } from "react";

import { Dimmer, Loader } from "semantic-ui-react";
import Cookies from "js-cookie";

import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Dashboard from "./containers/Dashboard";
import Landing from "./components/Landing";
import { getUser } from "./api/User";
import { getDefaultProject } from "./api/Project";

class App extends Component {
    constructor() {
        super();
        this.state = {
            currentUser: {},
            displayError: "",
            loggedIn: false,
            loading: false,
            isDemo: false,
        };

        this.getUser = this.getUser.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.setLoading = this.setLoading.bind(this);
    }

    componentDidMount() {
        /** Fetch user details if cookies stored */
        if (Cookies.get("token") && Cookies.get("user_id")) {
            this.setLoading(true);
            this.getUser(Cookies.get("user_id"));
        }
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    setLoading(bool) {
        this.setState({
            loading: bool,
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

    logOut = () => {
        Cookies.remove("token");
        Cookies.remove("user_id");
        this.setState({ loggedIn: false });
    };

    getUser(id) {
        // TODO: Handle Error
        getUser(id)
            .then(this.setCurrentUser)
            .then(() => this.setLoading(false))
            .catch((err) => console.log(err));
    }

    startDemo = async (history) => {
        const project = await getDefaultProject().catch((err) =>
            console.log(err)
        );
        this.setState({
            isDemo: true,
            currentUser: {
                id: -1,
                projects: [project],
            },
        });
        history.push({
            pathname: `/projects/${project.id}`,
            state: { from: "/" },
        });
    };

    render() {
        return (
            <Router>
                {this.state.loggedIn ? (
                    <Redirect to="/projects" />
                ) : (
                    <Redirect to="/" />
                )}
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <div className="fill-page">
                    <Route
                        path="/projects"
                        render={(props) => (
                            <Dashboard
                                currentUser={this.state.currentUser}
                                loggedIn={this.state.loggedIn}
                                logOut={this.logOut}
                                setCurrentUser={this.setCurrentUser}
                                getUser={this.getUser}
                                isDemo={this.state.isDemo}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Landing
                                getUser={this.getUser}
                                startDemo={this.startDemo}
                            />
                        )}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
