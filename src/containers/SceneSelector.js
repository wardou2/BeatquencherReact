import React, { Component } from 'react'
import {Form, Button, Icon, Header, List, Segment } from 'semantic-ui-react'
import * as edit from '../components/ContentEditable'
import DeleteModal from '../components/DeleteModal'
import Cookies from 'js-cookie'

const BASE_URL = 'https://evening-brook-20328.herokuapp.com/api/v1/'
const SCENES_URL = BASE_URL + 'scenes/'
let EditableProjectName = edit.contentEditable('h1')

export default class SceneSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      formType: '',
      name: '',
      title: '',
      editing: false,

      showModal: false
    }
    this.renderScenes = this.renderScenes.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
    this.form = this.form.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentProj.title !== state.title && !state.editing) {
      return {
        title: props.currentProj.title,
        editing: true
      }
    } else {
      return null
    }
  }

  handleClick(scene) {
    fetch(SCENES_URL+scene.id, {
      method: 'GET',
      headers: {
        'id_token': Cookies.get('id_token'),
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(json => this.props.setCurrentScene(json))
  }

  showForm(type) {
    this.setState({
      formType: type,
      name: 'Scene ' + (this.props.currentProj.scenes.length+1)
    })
  }

  hideForm() {
    this.setState({
      formType: ''
    })
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value })
  }

  handleSubmitScene = () => {
    this.props.newScene(this.state)
    this.hideForm()
  }

  handleSubmitProj = () => {
    this.props.handleChangeProject(['title'], this.state.title)
    this.setState({
      editing: false,
      formType: ''
    })
  }

  showDeleteModal = () => {
    this.setState({
      showModal: true
    })
  }

  turnShowOff = () => {
    this.setState({
      showModal: false
    })
  }

  form() {
    if (this.state.formType === 'newScene') {
      return(
          <Form onSubmit={this.handleSubmitScene}>
            <div className='fake-close-btn' ><Icon name="close" /></div>
            <div className='close-btn' ><Icon name="close" onClick={this.hideForm}/></div>
            <Header as='h2'>New Scene</Header>
            <Form.Input
              label='Name'
              placeholder='Name'
              name='name'
              value={this.state.name}
              onChange={this.handleChange}
            />
            <Button type='submit'>Submit</Button>
          </Form>
      )
    } else if (this.state.formType === 'proj') {
      return(
          <Form onSubmit={this.handleSubmitProj}>
            <div className='fake-close-btn' ><Icon name="close" /></div>
            <div className='close-btn' ><Icon name="close" onClick={this.hideForm}/></div>
            <Header as='h2'>Edit Project</Header>
            <Form.Input
              label='Title'
              placeholder='Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Button type='submit'>Submit</Button>
            <Button negative onClick={this.showDeleteModal}>Delete Project</Button>
          </Form>
      )
    } else {
      return <div>
              <Button onClick={() => this.showForm('newScene')}>Add New Scene</Button>
              <Button onClick={() => this.showForm('proj')}>Edit Project</Button>
            </div>
    }
  }

  renderScenes() {
    return <List divided relaxed>
      {this.props.currentProj.scenes.map(scene => {
        return  <List.Item key={scene.id} onClick={() => this.handleClick(scene)}>
                  <List.Content>
                    <List.Header as='a'>{scene.name}</List.Header>
                  </List.Content>
                </List.Item>
        })}
    </List>
  }

  render() {

    return <div className='projects-list'>
            <br></br>
            <DeleteModal
              show={this.state.showModal} turnShowOff={this.turnShowOff}
              currentProj={this.props.currentProj} projectWasDeleted={this.props.projectWasDeleted}
            />
            <Segment>
              <Header as='h2'>Select Scene</Header>
              {this.renderScenes()}
            </Segment>
            <Segment>
              {this.form()}
            </Segment>
          </div>
  }
}
