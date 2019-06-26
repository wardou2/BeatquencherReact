import React, { Component } from 'react'
import { Form, Dropdown, Divider, Header} from 'semantic-ui-react'

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
    key: 'triangle',
    text: 'Triangle Wave',
    value: 'triangle',
    image: { avatar: true, src: '/images/triangle.jpg' },
  },
  {
    key: 'sawtooth',
    text: 'Sawtooth Wave',
    value: 'sawtooth',
    image: { avatar: true, src: '/images/sawtooth.jpg' },
  },
  {
    key: 'fmsine',
    text: 'FM Sine Wave',
    value: 'fmsine',
    image: { avatar: true, src: '/images/sine.jpg' },
  },
  {
    key: 'fmsquare',
    text: 'FM Square Wave',
    value: 'fmsquare',
    image: { avatar: true, src: '/images/square.jpg' },
  },
  {
    key: 'fmtriangle',
    text: 'FM Triangle Wave',
    value: 'fmtriangle',
      image: { avatar: true, src: '/images/triangle.jpg' },
  },
  {
    key: 'fmsawtooth',
    text: 'FM Sawtooth Wave',
    value: 'fmsawtooth',
    image: { avatar: true, src: '/images/sawtooth.jpg' },
  }
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
        <div className='dropdown-div'>
          <Header as='h4'>Oscillator Source</Header>
          <Dropdown
            value={this.props.currentIns.options.oscillator.type}
            fluid
            selection
            options={oscTypeOptions}
            onChange={(e, {value}) => this.handleChange(e, ['oscillator','type'],{value})}
          />
        </div>
        <Divider />
        <Header as='h3'>Envelope</Header>
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
             min={0.001}
             max={3}
             name='decay'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','decay'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.decay}
           />
          <Form.Input
             label={`Sustain: ${this.props.currentIns.options.envelope.sustain} `}
             min={0.001}
             max={.99}
             name='sustain'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','sustain'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.sustain}
           />
          <Form.Input
             label={`Release: ${this.props.currentIns.options.envelope.release}s `}
             min={0.001}
             max={3}
             name='release'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','release'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.release}
           />
         </Form.Group>
         <Divider />
        <Header as='h3'>Filter Envelope</Header >
        <Form.Group widths='equal'>
          <Form.Input
             label={`Attack: ${this.props.currentIns.options.filterEnvelope.attack}s `}
             min={0.001}
             max={3}
             name='attack'
             onChange={(e, {value}) => this.handleChange(e, ['filterEnvelope','attack'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.filterEnvelope.attack}
           />
          <Form.Input
             label={`Decay: ${this.props.currentIns.options.filterEnvelope.decay}s `}
             min={0.001}
             max={3}
             name='decay'
             onChange={(e, {value}) => this.handleChange(e, ['filterEnvelope','decay'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.filterEnvelope.decay}
           />
          <Form.Input
             label={`Sustain: ${this.props.currentIns.options.filterEnvelope.sustain} `}
             min={0.001}
             max={.99}
             name='sustain'
             onChange={(e, {value}) => this.handleChange(e, ['filterEnvelope','sustain'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.filterEnvelope.sustain}
           />
          <Form.Input
             label={`Release: ${this.props.currentIns.options.filterEnvelope.release}s `}
             min={0.001}
             max={3}
             name='release'
             onChange={(e, {value}) => this.handleChange(e, ['filterEnvelope','release'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.filterEnvelope.release}
           />
         </Form.Group>
      </Form>
    )
  }
}
