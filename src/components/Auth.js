import React, { Component } from 'react'
import Cookies from 'js-cookie'

const errorStyle = {'background-color': 'red'}

export default class Auth extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

  handleClick(e) {
    // Prevents page reload
    e.preventDefault();

    // Initializes OAuth.io with API key
    // Sign-up an account to get one
    window.OAuth.initialize('dD7lG2sjeOKVRA-hIdKUqDrbrEc');

    // Popup Google and ask for authorization
    window.OAuth.popup('google').then((provider) => {

      // Prompts 'welcome' message with User's name on successful login
      // Check console logs for additional User info
      provider.me().then((data) => {
        Cookies.set("id_token", provider.id_token)
        Cookies.set("email", data.email.toLowerCase())
        let display_name = data.raw.names[0].displayName
        this.sendAuth(display_name)
      });

    });
  }

  sendAuth = (name) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: Cookies.get('email')})
    })
    .then(res => res.json())
    .then(json => this.props.setCurrentUser(json.user))
  }

  showError = () => {
    return <div style={errorStyle}>
              Sign in failed, please try again.
            </div>
  }

  render() {
    return <div>
            {(this.props.displayError) ? this.showError : null}
            <a href="" onClick={(e) => this.handleClick(e)} className="btn btn-social btn-github">
              <span className="fa fa-github"></span> Sign in with Google
            </a>
           </div>
  }
}
