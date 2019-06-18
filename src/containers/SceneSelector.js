import React, { Component } from 'react'
import {Form, Button, Icon } from 'semantic-ui-react'
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
    // this.renderScenes =this.renderScenes.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.showForm = this.showForm.bind(this)
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

  // renderScenes() {
  //   // if (Object.entries(this.props.currentProj).length !== 0) {
  //     return <div>
  //       <ul>
  //         {this.props.currentProj.scenes.map(scene => {
  //           return <li key={scene.id} onClick={() => this.handleClick(scene)}>
  //                   {scene.name}
  //                 </li>
  //         })}
  //       </ul>
  //       <h3 onClick={this.props.newScene}>Add New Scene</h3>
  //     </div>
  //   // }
  // }

  showForm() {
    console.log('show form');
    this.setState({
      formHidden: false,
      name: 'Scene ' + (this.props.currentProj.scenes.length+1)
    })
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.newScene(this.state)
  }

  form() {
    console.log('check form');
    if (!this.state.formHidden) {
      return(
        <Form onSubmit={this.handleSubmit}>
          <h2>New Scene</h2>
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
    }
  }

  render() {
    let EditableProjectName = edit.contentEditable('h1')
    return <div>
      <EditableProjectName value={this.props.currentProj.title} onSave={(val) => this.props.handleChangeProject(['title'], val)}/>
      <h2>Select Scene</h2>
      <div>
        <ul>
          {this.props.currentProj.scenes.map(scene => {
            return <li key={scene.id} onClick={() => this.handleClick(scene)}>
                    {scene.name}
                  </li>
          })}
        </ul>
        <h3 onClick={this.showForm}>Add New Scene</h3>
      </div>
      {this.form()}
    </div>
  }
}
