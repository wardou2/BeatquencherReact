import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import { Icon, Header} from 'semantic-ui-react'

export default class Navbar extends Component {

  constructor(props){
    super(props)
    this.state = {
      menuVisible: false
    }
  }

  toggleMenuVisible = () => {
    this.setState({menuVisible: !this.state.menuVisible}, () => {

    })
  }

  render(){
    return (
      <div className="navbar">
        <div className='blank-div'>
          <br></br>
        </div>
        <div className="nav-title">
          <Header as='h2'>PROJECT NAME</Header>
        </div>
       <div className="navbar-toggle" id="js-navbar-toggle" onClick={this.toggleMenuVisible}>
          <Icon name="bars"/>
       </div>
      </div>
    )
  }
}
