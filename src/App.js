import React, { Component } from "react";

import { Dimmer, Loader } from "semantic-ui-react";
import Cookies from "js-cookie";

import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
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

    logOut = () => {
        Cookies.remove("token");
        Cookies.remove("user_id");
        this.setState({ loggedIn: false });
    };

    getUser(id) {
        // TODO: Handle Error
        getUser(id)
            .then(this.setCurrentUser)
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <Router>
                <Dimmer active={this.state.loading}>
                    <Loader>Loading</Loader>
                </Dimmer>

                <div className="fill-page">
                    <Dashboard
                        currentUser={this.state.currentUser}
                        loggedIn={this.state.loggedIn}
                        logOut={this.logOut}
                        setCurrentUser={this.setCurrentUser}
                        getUser={this.getUser}
                    />
                </div>
            </Router>
        );
    }
}

export default App;
