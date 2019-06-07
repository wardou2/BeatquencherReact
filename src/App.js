import React, { Component } from 'react';
import logo from './logo.svg';
import { GoogleLogin } from 'react-google-login';
import config from './config.json'
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = { isAuthenticated: false, user: null, token: ''};
  }

  logout = () => {
      this.setState({isAuthenticated: false, token: '', user: null})
  };

  googleResponse = (response) => {
    console.log(response)
  }

  onFailure = (error) => {
    alert(error);
  }

  render() {
    let content = !!this.state.isAuthenticated ?
      (
        <div>
            <p>Authenticated</p>
            <div>
                {this.state.user.email}
            </div>
            <div>
                <button onClick={this.logout} className="button">
                    Log out
                </button>
            </div>
        </div>
    ) :
    (
        <div>
            <GoogleLogin
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.googleResponse}
                onFailure={this.onFailure}
            />
        </div>
      );

  return (
      <div className="App">
          {content}
      </div>
    );
  }
}


export default App;
