import React, { Component } from 'react'
const BASE_URL = 'http://localhost:3000/api/v1/'
const SCENES_URL = BASE_URL + 'scenes/'

export default class SceneSelector extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
    this.renderScenes =this.renderScenes.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(scene) {
    fetch(SCENES_URL+scene.id)
    .then(res => res.json())
    .then(json => this.props.setCurrentScene(json))
  }

  renderScenes() {
    if (Object.entries(this.props.currentProj).length !== 0) {
      console.log(this.props.currentProj);
      return <ul>
        {this.props.currentProj.scenes.map(scene => {
          return <li key={scene.id} onClick={() => this.handleClick(scene)}>
                  {scene.name}
                </li>
        })}
      </ul>
    }
  }

  render() {
    return <div>
      <h1>{this.props.currentProj.title} - Select Scene</h1>
      {this.renderScenes()}
    </div>
  }
}
