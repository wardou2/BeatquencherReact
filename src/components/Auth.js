import React, { Component } from 'react'
import Cookies from 'js-cookie'
import {BASE_URL} from '../api_url'

const GOOGLE_BUTTON_ID = 'google-sign-in-button'

export default class Auth extends Component {

  componentDidMount() {
    console.log('Auth didMount');
    window.addEventListener('google-loaded', this.loadButton)
  }

  loadButton = () => {
    
    window.gapi.signin2.render(
      GOOGLE_BUTTON_ID,
      {
        width: 230,
        height: 50,
        longtitle: 'true',
        theme: 'dark',
        onsuccess: this.onSuccess,
      },
    );
  
  }

  sendAuth = (name) => {
    this.props.setLoading(true)
    fetch(BASE_URL+'login', {
      method: 'POST',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: name, email: Cookies.get('email')})
    })
    .then(res => res.json())
    .then(json => {
        this.props.setLoading(false)
        this.props.setCurrentUser(json.user)
    })
  }

  onSuccess = (googleUser) => {

    var profile = googleUser.getBasicProfile();

    Cookies.set("id_token", googleUser.getAuthResponse().id_token)
    Cookies.set("email", profile.getEmail().toLowerCase())
    this.sendAuth(profile.getName())
  }

  render() {
    return (
        <div className="login-wrapper">
            <div className='login-btn' id={GOOGLE_BUTTON_ID}></div>
            <div className="color-beam purple" style={{animationDelay: "1s"}}></div>
            <div className="color-beam yellow" style={{animationDelay: "2s"}}></div>
            <div className="color-beam green" style={{animationDelay: "3s"}}></div>
            <div className="color-beam blue" style={{animationDelay: "4s"}}></div>
        </div>
       )
   }
}
