import React, { Component } from 'react'
import {Form, Button, Icon, Header, List, Segment } from 'semantic-ui-react'
import * as edit from '../components/ContentEditable'
import Cookies from 'js-cookie'

const BASE_URL = 'http://localhost:3000/api/v1/'
const SCENES_URL = BASE_URL + 'scenes/'

export default class SceneSelector extends Component {

  constructor(props){
    super(props)
    this.state = {
      formHidden: true,
      name: ''
    }
    this.renderScenes = this.renderScenes.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showForm = this.showForm.bind(this)
    this.hideForm = this.hideForm.bind(this)
    this.form = this.form.bind(this)
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

  showForm() {
    console.log('show form');
    this.setState({
      formHidden: false,
      name: 'Scene ' + (this.props.currentProj.scenes.length+1)
    })
  }

  hideForm() {
    console.log('hide form');
    this.setState({
      formHidden: true
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.newScene(this.state)
  }

  form() {
    if (!this.state.formHidden) {
      return(
          <Form onSubmit={this.handleSubmit}>
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
    } else {
      return <Button onClick={this.showForm}>Add New Scene</Button>
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
    let EditableProjectName = edit.contentEditable('h1')

    return <div className='projects-list'>
            <EditableProjectName className='glow' value={this.props.currentProj.title} onSave={(val) => this.props.handleChangeProject(['title'], val)}/>
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
