import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import { Icon, Header} from 'semantic-ui-react'

export default class Navbar extends Component {

  isEmpty = (obj) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  showLogout = () => {
    return (this.props.loggedIn) ? <a onClick={this.props.logOut} className="nav-links">Logout</a> : ' '
  }

  getRoute = () => {
    console.log(this.props.history)
    this.props.history.goBack()
    switch (this.props.pToDisplay) {
      case 'projectSelector':
        return  <a onClick={() => this.props.handleToDisplay('', true)} className="nav-links"><Icon name='arrow alternate circle left outline'/>Projects</a>
      case 'startNewProject':
        return  <a onClick={() => this.props.handleToDisplay('', true)} className="nav-links"><Icon name='arrow alternate circle left outline'/>Projects</a>
      case 'sceneSelector':
        return <a onClick={() => this.props.handleToDisplay('projectSelector')} className="nav-links"><Icon name='arrow alternate circle left outline'/>Scenes</a>
      default:
        return <div><Icon name='headphones' /></div>
    }
  }

  render(){
    return (
      <div className="navbar">
        <div className='blank-div'>
          {this.getRoute()}
        </div>
        <div className="nav-title">
          <Header as='h1' className='glow'>{(!this.isEmpty(this.props.currentProj)) ? this.props.currentProj.title : 'Beatquencher'}</Header>
        </div>
        <div className="navbar-links" id="js-navbar-toggle" onClick={this.toggleMenuVisible}>
          {this.showLogout()}
        </div>
      </div>
    )
  }
}
