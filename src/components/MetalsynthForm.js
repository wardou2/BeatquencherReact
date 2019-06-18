import React, { Component } from 'react'
import { Form, Dropdown} from 'semantic-ui-react'

export default class MetalsynthForm extends Component {

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
        <label>Oscillator </label>
        <Form.Group widths='equal'>
          <Form.Input
             label={`Resonance: ${this.props.currentIns.options.resonance} Hz`}
             min={1}
             max={16000}
             name='resonance'
             onChange={(e, {value}) => this.handleChange(e, ['resonance'],{value})}
             step={1}
             type='range'
             value={this.props.currentIns.options.resonance}
           />
          <Form.Input
             label={`Frequency: ${this.props.currentIns.options.frequency} Hz`}
             min={1}
             max={16000}
             name='frequency'
             onChange={(e, {value}) => this.handleChange(e, ['frequency'],{value})}
             step={1}
             type='range'
             value={this.props.currentIns.options.frequency}
           />
          <Form.Input
             label={`Octaves: ${this.props.currentIns.options.octaves}`}
             min={1}
             max={12}
             name='octaves'
             onChange={(e, {value}) => this.handleChange(e, ['octaves'],{value})}
             step={0.5}
             type='range'
             value={this.props.currentIns.options.octaves}
           />
        </Form.Group>
        <label>Envelope</label>
        <Form.Group widths='equal'>
          <Form.Input
             label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
             min={0.001}
             max={3}
             name='attack'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','attack'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.attack}
           />
          <Form.Input
             label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
             min={0.002}
             max={3}
             name='decay'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','decay'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.decay}
           />
          <Form.Input
             label={`Release: ${this.props.currentIns.options.envelope.release}s `}
             min={0.001}
             max={1}
             name='release'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','release'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.release}
           />
         </Form.Group>
      </Form>
    )
  }
}
