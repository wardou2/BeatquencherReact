import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';

import config from './config.json'
import './App.css';
import Cookies from 'js-cookie'
import Auth from './components/Auth'
import Dashboard from './containers/Dashboard'


const BASE_URL = 'http://localhost:3000/api/v1/'
const USERS_URL = BASE_URL + 'users/'
const PROJECTS_URL = BASE_URL + 'projects/'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentUser: {},
      displayError: '',
      loggedIn: false
    }

    this.getUser = this.getUser.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  componentDidMount() {

  }

  renderLoginRedirect = () => {
    return (Cookies.get('id_token')) ? this.getUser() : <Redirect to='/login' />
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  setCurrentUser(user) {
    this.setState({currentUser: user, loggedIn: true})
  }

  handleErrors = (response) => {
    if (!response.ok) {
        this.setState({displayError: true, loggedIn: false})
        Cookies.remove('id_token')
        throw response
    }
    return response.json();
  }

  logOut = () => {
    console.log('here');
    this.setState({loggedIn: false})
    Cookies.remove('id_token')
  }

  getUser() {
    console.log('getUser', this.state.currentUser);
    let email = Cookies.get('email').toLowerCase()
    fetch(USERS_URL+'find', {
      method: 'PUT',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    .then(res => this.handleErrors(res))
    .then(json => this.setCurrentUser(json))
    .catch(error => {
      error.text().then( errorMessage => {
         this.setState({displayError: errorMessage})
       })
    })
  }

  render() {
    return(
      <Router>
        {(!this.state.loggedIn) ? this.renderLoginRedirect() : <Redirect to='/'/>}
        <div>
          <Route exact path='/login' render={(props) => <Auth setCurrentUser={this.setCurrentUser} dispalayError={this.state.displayError}/>} />
          <Route
            exact path='/'
            render={(props) => <Dashboard
                                  currentUser={this.state.currentUser} loggedIn={this.state.loggedIn}
                                  logOut={this.logOut}
                                />}
          />
        </div>
      </Router>
    )
  }
}

export default App;
