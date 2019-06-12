import React, { Component } from 'react';
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom';

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
      currentUser: {}
    }

    this.getUser = this.getUser.bind(this)
    this.setCurrentUser = this.setCurrentUser.bind(this)
  }

  componentDidMount() {
    if (Cookies.get('id_token')) {
      this.getUser()
    }
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  setCurrentUser(user) {
    this.setState({currentUser: user})
  }

  getUser() {

    console.log('getUser');
    let email = Cookies.get('email').toLowerCase()
    fetch(USERS_URL+'find', {
      method: 'PUT',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email})
    })
    .then(res => res.json())
    .then(json => this.setCurrentUser(json))
  }

  render() {
    return(
      <Router>
        <React.Fragment>
          <Route exact path='/login' render={(props) => <Auth setCurrentUser={this.setCurrentUser}/>} />
          <Route
            path='/'
            render={(props) => <Dashboard currentUser={this.state.currentUser}/>}
          />
        </React.Fragment>
      </Router>
    )
  }
}

export default App;
