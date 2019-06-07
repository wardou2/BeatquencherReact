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
      const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
      const options = {
          method: 'POST',
          body: tokenBlob,
          mode: 'cors',
          cache: 'default'
      };
      fetch('http://localhost:3000/api/v1/auth/google', options).then(r => {
          const token = r.headers.get('x-auth-token');
          r.json().then(user => {
              if (token) {
                  this.setState({isAuthenticated: true, user, token})
              }
          });
      })
  };

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
