import React, { Component } from 'react'
import ProjectsList from './ProjectsList'
import SceneSelector from './SceneSelector'
import ProjectView from './ProjectView'

export default class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentProj: {},
      currentScene: {},
      toDisplay: 'projectSelector'
    }
    this.setCurrentProj = this.setCurrentProj.bind(this)
    this.setCurrentScene = this.setCurrentScene.bind(this)
    this.conditionalRender = this.conditionalRender.bind(this)
  }

  setCurrentProj(proj) {
    console.log('setCurrentProj', proj);
    this.setState({currentProj: proj, toDisplay: 'sceneSelector'})
  }

  setCurrentScene(scene) {
    console.log('setCurrentScene', scene);
    this.setState({currentScene: scene, toDisplay: 'projectView'})
  }

  conditionalRender() {
    switch(this.state.toDisplay) {
      case 'projectSelector':
        return <ProjectsList
                  currentUser={this.props.currentUser} setCurrentProj={this.setCurrentProj}
                />
        break
      case 'sceneSelector':
        return <SceneSelector
                  currentUser={this.props.currentUser} currentProj={this.state.currentProj}
                  setCurrentScene={this.setCurrentScene}
                />
        break
      case 'projectView':
        return <ProjectView
                  currentUser={this.props.currentUser} currentProj={this.state.currentProj}
                  currentScene={this.state.currentScene}
                />
        break
      default:
        return <span>"Please Log In"</span>
      }
  }
  render(){
    return this.conditionalRender()
  }
}
