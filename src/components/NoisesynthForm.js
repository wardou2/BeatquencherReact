import React, { Component } from 'react'
import { Form, Dropdown, Header, Segment, Divider } from 'semantic-ui-react'

const noiseTypeOptions = [
  {
    key: 'white',
    text: 'White',
    value: 'white',
  },
  {
    key: 'brown',
    text: 'Brown',
    value: 'brown',
  },
  {
    key: 'pink',
    text: 'Pink',
    value: 'pink',
  },
]

export default class NoisesynthForm extends Component {

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
        <Divider />
        <Header as='h3'>Oscillator</Header>
        <Form.Group widths='equal'>
          <Dropdown
            value={this.props.currentIns.options.noise.type}
            fluid
            selection
            options={noiseTypeOptions}
            onChange={(e, {value}) => this.handleChange(e, ['noise','type'],{value})}
          />
          <Form.Input
             label={`Reverb: ${this.props.getEffect(['reverb', 'wet'])*100}%`}
             min={0}
             max={1}
             name='reverb'
             onChange={(e, {value}) => this.props.handleChangeEffect(this.props.currentIns.id, ['reverb', 'wet'], {value})}
             step={0.01}
             type='range'
             value={this.props.getEffect(['reverb', 'wet'])}
           />
          <Form.Input
             label={`Filter Cutoff: ${this.props.getEffect(['filter', 'frequency'])} Hz`}
             min={1}
             max={18000}
             name='reverb'
             onChange={(e, {value}) => this.props.handleChangeEffect(this.props.currentIns.id, ['filter', 'frequency'], {value})}
             step={1}
             type='range'
             value={this.props.getEffect(['filter', 'frequency'])}
           />
           <Form.Input
              label={`Filter Q: ${this.props.getEffect(['filter', 'Q'])}`}
              min={0.01}
              max={20}
              name='reverb'
              onChange={(e, {value}) => this.props.handleChangeEffect(this.props.currentIns.id, ['filter', 'Q'], {value})}
              step={0.01}
              type='range'
              value={this.props.getEffect(['filter', 'Q'])}
            />
        </Form.Group>
        <Divider />

        <Header as='h3'>Envelope</Header>
        <Form.Group widths='equal'>
          <Form.Input
             label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
             min={0.001}
             max={1}
             name='attack'
             onChange={(e, {value}) => this.handleChange(e, ['envelope','attack'],{value})}
             step={0.001}
             type='range'
             value={this.props.currentIns.options.envelope.attack}
           />
          <Form.Input
             label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
             min={0.001}
             max={1}
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
         </Form.Group>
      </Form>
    )
  }
}
