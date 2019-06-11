import React, { Component } from 'react'
import { Form, Dropdown} from 'semantic-ui-react'

const oscTypeOptions = [
  {
    key: 'sine',
    text: 'Sine Wave',
    value: 'sine',
    image: { avatar: true, src: '/images/sine.jpg' },
  },
  {
    key: 'square',
    text: 'Square Wave',
    value: 'square',
    image: { avatar: true, src: '/images/square.jpg' },
  },
  {
    key: 'sawtooth',
    text: 'Sawtooth Wave',
    value: 'sawtooth',
    image: { avatar: true, src: './images/sawtooth.jpg' },
  },
]

export default class MonosynthForm extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, field, {value}) {
    this.props.handleChangeInstrument(this.props.currentIns.id, field, value)
  }

  render(){
    return (
      <Form>
        <label>Oscillator Type</label>
        <Dropdown
          value={this.props.currentIns.options.oscillator.type}
          fluid
          selection
          options={oscTypeOptions}
          onChange={(e, {value}) => this.handleChange(e, ['oscillator','type'],{value})}
        />
        <label>Envelope</label>
        <Form.Group widths='equal'>
          <Form.Input
             label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
             min={0}
             max={3}
             name='attack'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','attack'],{value})}
             step={.01}
             type='range'
             value={this.props.currentIns.options.envelope.attack}
           />
          <Form.Input
             label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
             min={0}
             max={3}
             name='decay'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','decay'],{value})}
             step={.01}
             type='range'
             value={this.props.currentIns.options.envelope.decay}
           />
          <Form.Input
             label={`Sustain: ${this.props.currentIns.options.envelope.sustain}s `}
             min={0}
             max={3}
             name='sustain'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','sustain'],{value})}
             step={.01}
             type='range'
             value={this.props.currentIns.options.envelope.sustain}
           />
          <Form.Input
             label={`Release: ${this.props.currentIns.options.envelope.release}s `}
             min={0}
             max={3}
             name='release'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','release'],{value})}
             step={.01}
             type='range'
             value={this.props.currentIns.options.envelope.release}
           />
         </Form.Group>
      </Form>
    )
  }
}
