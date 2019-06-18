import React, { Component } from 'react'
import { Form, Dropdown, Button} from 'semantic-ui-react'

export default class NewProjectForm extends Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      tempo: 120,
      scenes: 3
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    this.props.newProject(this.state)
  }

  render(){
    const { name, tempo, scenes } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <h1>New Project</h1>
        <Form.Input
          label='Name'
          placeholder='Name'
          name='name' value={name}
          onChange={this.handleChange}
        />
        <Form.Input
          label='Tempo'
          placeholder='Tempo (bpm)'
          name='tempo'
          value={tempo}
          type={'number'}
          onChange={this.handleChange}
        />
        <Form.Input
          label='Number of Scenes'
          name='scenes'
          value={scenes}
          type='number'
          onChange={this.handleChange}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}
