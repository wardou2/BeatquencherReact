import React, { Component} from 'react'
import { Link } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000/api/v1/'
const PROJECTS_URL = BASE_URL + 'projects/'

export default class ProjectsList extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderProjects = this.renderProjects.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  handleClick(proj) {
    fetch(PROJECTS_URL+proj.id)
    .then(res => res.json())
    .then(json => this.props.setCurrentProj(json))
  }

  renderProjects() {
    console.log('renderProjs', this.props.currentUser);
    if (!this.isEmpty(this.props.currentUser)) {
      console.log(this.props.currentUser);
      return <ul>
        {this.props.currentUser.projects.map(proj => {
          return <li key={proj.id} onClick={() => this.handleClick(proj)}>
                  {proj.title}
                </li>
        })}
      </ul>
    }
  }

  render() {

    return(
      <React.Fragment>
        <h1>Select Project</h1>
        {this.renderProjects()}
      </React.Fragment>
    )
  }
}
