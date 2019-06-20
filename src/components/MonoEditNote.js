import React, { Component } from 'react'
import { Header, Image, Modal, Form, Dropdown, Button, Radio, Segment } from 'semantic-ui-react'


const octaveOptions = [
  {
    key: '0',
    text: '0',
    value: '0'
  },
  {
    key: '1',
    text: '1',
    value: '1'
  },
  {
    key: '2',
    text: '2',
    value: '2'
  },
  {
    key: '3',
    text: '3',
    value: '3'
  },
  {
    key: '4',
    text: '4',
    value: '4'
  },
  {
    key: '5',
    text: '5',
    value: '5'
  }
]

const noteOptions = [
  {
    key: 'A',
    text: 'A',
    value: 'A'
  },
  {
    key: 'A#',
    text: 'A#',
    value: 'A#'
  },
  {
    key: 'B',
    text: 'B',
    value: 'B'
  },
  {
    key: 'C',
    text: 'C',
    value: 'C'
  },
  {
    key: 'C#',
    text: 'C#',
    value: 'C#'
  },
  {
    key: 'D',
    text: 'D',
    value: 'D'
  },
  {
    key: 'D#',
    text: 'D#',
    value: 'D#'
  },
  {
    key: 'E',
    text: 'E',
    value: 'E'
  },
  {
    key: 'F',
    text: 'F',
    value: 'F'
  },
  {
    key: 'F#',
    text: 'F#',
    value: 'F#'
  },
  {
    key: 'G',
    text: 'G',
    value: 'G'
  },
  {
    key: 'G#',
    text: 'G#',
    value: 'G#'
  }
]

export default class MonoEditNote extends Component {

  constructor(props) {
    super(props)
    this.state = {
      note: '',
      octave: '',
      currentNote: '',
      active: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    console.log('gdsfp', props);
    if (props.currentNote !== state.currentNote) {
      if (props.currentNote[1] === '#') {
        return {
          note: props.currentNote.slice(0,2),
          octave: props.currentNote[2],
          currentNote: props.currentNote
        }
      }
      return {
        note: props.currentNote[0],
        octave: props.currentNote[1],
        currentNote: props.currentNote
      }
    } else {
      return null
    }
  }

  handleChange = (e, value, name) => {
    this.setState({
      [name]: value
    }, console.log(this.state.note))
  }

  chooseNotes = () => {
    let combo = this.state.note + this.state.octave
    this.props.chooseNotes(combo, this.state.active)
  }

  toggleActive = () => {
    this.setState({
      active: !this.state.active
    })
  }

  render(){
    return(
      <Form onSubmit={this.chooseNotes}>
        <Dropdown
          placeholder='Select a Note'
          fluid
          selection
          options={noteOptions}
          value={this.state.note}
          onChange={(e, {value}) => this.handleChange(e, value, 'note')}
        />
        <Dropdown
          placeholder='Select an Octave'
          fluid
          selection
          options={octaveOptions}
          value={this.state.octave}
          onChange={(e, {value}) => this.handleChange(e, value, 'octave')}
        />
        <br></br>
        <Radio className='float-left' label='Active' toggle checked={this.state.active} onClick={this.toggleActive}/>
        <Button type="submit">Done</Button>
      </Form>
    )
  }
}
