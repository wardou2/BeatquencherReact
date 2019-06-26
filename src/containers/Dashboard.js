import React, { Component } from 'react'
import Navbar from '../components/Navbar'
import ProjectsList from './ProjectsList'
import SceneSelector from './SceneSelector'
import ProjectView from './ProjectView'
import NewProjectForm from '../components/NewProjectForm'
import Tone from 'tone';
import { Container } from 'semantic-ui-react'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:3000/api/v1/'

export default class Dashboard extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentProj: {},
      currentScene: {},
      toDisplay: 'projectSelector',
      pToDisplay: ''
    }
    this.setCurrentProj = this.setCurrentProj.bind(this)
    this.setCurrentScene = this.setCurrentScene.bind(this)
    this.conditionalRender = this.conditionalRender.bind(this)
    this.handleChangeProject = this.handleChangeProject.bind(this)
    this.startNewProject = this.startNewProject.bind(this)
    this.newProject = this.newProject.bind(this)
    this.newScene = this.newScene.bind(this)
    this.handleChangeScene = this.handleChangeScene.bind(this)
    this.handleToDisplay = this.handleToDisplay.bind(this)
    this.projectWasDeleted = this.projectWasDeleted.bind(this)
  }

  startNewProject() {
    this.setState({
      toDisplay: 'startNewProject',
      pToDisplay: 'projectSelector'
    })
  }

  newProject(vals) {
    fetch(BASE_URL+'init', {
      method: 'POST',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project: {
          title: vals.name,
          tempo: vals.tempo,
          user_id: this.props.currentUser.id,
          scene_count: vals.scenes
        }
      }),
    })
    .then(res => res.json())
    .catch(error => console.error('Error', error))
    .then(json => this.setCurrentProj(json))
  }

  handleToDisplay(other, resetProj = false) {
    // let tdCopy = this.state.toDisplay
    if (resetProj) {
      this.setState({
        currentProj: {}
      })
    }
    Tone.Transport.stop()
    this.setState({
      toDisplay: this.state.pToDisplay,
      pToDisplay: other
    })
  }

  projectWasDeleted(path) {
    this.setState({
      toDisplay: path,
      currentProj: {}
    })
  }

  setCurrentProj(proj) {
    console.log('setCurrentProj', proj);
    let tdCopy = this.state.toDisplay
    this.setState({currentProj: proj, toDisplay: 'sceneSelector', pToDisplay: tdCopy})
  }

  setCurrentScene(scene) {
    console.log('setCurrentScene', scene);
    Tone.Transport.cancel()
    let tdCopy = this.state.toDisplay
    this.setState({currentScene: scene, toDisplay: 'projectView', pToDisplay: tdCopy})
  }

  handleChangeProject(field, value) {
    let projCopy = this.state.currentProj
    if (field[0] === 'title') {
      projCopy[field[0]] = value
    } else {
      projCopy[field[0]] = parseInt(value.value)
    }
    this.setState({
      currentProj: projCopy
    })
  }

  handleChangeScene(field, value) {
    let currentSceneCopy = this.state.currentScene
    let scenesCopy = this.state.currentProj.scenes

    if (field[0] === 'name') {
      currentSceneCopy[field[0]] = value
    }

    let foundIndex = scenesCopy.findIndex(scene => scene.id === currentSceneCopy.id)
    scenesCopy[foundIndex] = currentSceneCopy

    let currentProjCopy = this.state.currentProj
    currentProjCopy.scenes = scenesCopy

    this.setState({
      currentScene: currentSceneCopy,
      currentProj: currentProjCopy
    })
  }

  saveProject = () => {
    fetch(BASE_URL+'projects/'+this.state.currentProj.id, {
      method: 'PATCH',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        project: {
          title: this.state.currentProj.title,
          tempo: this.state.currentProj.tempo
        }
      })
    })
  }

  saveScene = () => {

    fetch(BASE_URL+'scenes/'+this.state.currentScene.id, {
      method: 'PATCH',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({scene: this.state.currentScene})
    })
    .then(res => res.json())
    .then(json => console.log(json))
  }

  newScene(vals) {
    fetch(BASE_URL+'scenes', {
      method: 'POST',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        scene: {
          name: vals.name,
          project_id: this.state.currentProj.id
        }
      }),
    })
    .then(res => res.json())
    .then(json => {
      let projCopy = this.state.currentProj
      projCopy = {
        ...projCopy,
        scenes: [
          ...projCopy.scenes,
          json
        ],
        tracks: [
          ...projCopy.tracks,
          ...json.tracks
        ]
      }
      this.setState({
        currentProj: projCopy
      })
    })
  }

  conditionalRender() {
    switch(this.state.toDisplay) {
      case 'projectSelector':
        return <ProjectsList
                  currentUser={this.props.currentUser} setCurrentProj={this.setCurrentProj}
                  startNewProject={this.startNewProject}
                />
        break
      case 'sceneSelector':
        return <SceneSelector
                  currentUser={this.props.currentUser} currentProj={this.state.currentProj}
                  setCurrentScene={this.setCurrentScene} newScene={this.newScene}
                  handleChangeProject={this.handleChangeProject} saveProject={this.saveProject}
                  projectWasDeleted={this.projectWasDeleted}
                />
        break
      case 'projectView':
        return <ProjectView
                  currentUser={this.props.currentUser} currentProj={this.state.currentProj}
                  currentScene={this.state.currentScene} handleChangeProject={this.handleChangeProject}
                  saveProject={this.saveProject} handleChangeScene={this.handleChangeScene}
                  saveScene={this.saveScene}
                />
        break
      case 'startNewProject':
        return <NewProjectForm
                  newProject={this.newProject}
                />
        break
      default:
        return <span>"Please Log In"</span>
      }
  }
  render(){
    return <div>
            <Navbar
              currentProj={this.state.currentProj} loggedIn={this.props.loggedIn} logOut={this.props.logOut}
              handleToDisplay={this.handleToDisplay} pToDisplay={this.state.pToDisplay}
            />
            <Container textAlign="center" className='main-container'>
              {this.conditionalRender()}
            </Container>
          </div>
  }
}
