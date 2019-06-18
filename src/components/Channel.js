import React, { Component } from 'react'
import Sequencer from './Sequencer'
import { Container, Form, Grid, Button } from 'semantic-ui-react'
import '../index.css';

export default class Channel extends Component {

  constructor(props){
    super(props)
    this.state = {
      track: {

      }
    }
    this.toggleCell = this.toggleCell.bind(this)
    this.getRightNote = this.getRightNote.bind(this)
    this.isSelected = this.isSelected.bind(this)
  }

  getRightNote() {
    switch (this.props.instrument.ins_type) {
      case "closed_hihat":
        return "C4"
        break
      default :
        return "F1"
    }
  }

  componentDidMount() {
    let track = this.props.tracks.find(t => {
      return (t.scene_id === this.props.currentScene.id && t.instrument_id === this.props.instrument.id)
    })
    this.setState({track})
  }

  toggleCell(i) {
    let track = this.props.tracks.find(t => {
      return (t.scene_id === this.props.currentScene.id && t.instrument_id === this.props.instrument.id)
    })
    let notesCopy = track.notes
    if (notesCopy[i]) {
      notesCopy[i] = ''
    } else {
      notesCopy[i] = this.getRightNote()
    }
    track.notes = notesCopy
    this.props.updateTrack(track)
  }

  handleChange(e, field, {value}) {
    this.props.handleChangeInstrument(this.props.instrument.id, field, value)
  }

  isSelected() {
    if (this.props.currentIns.id === this.props.instrument.id) {
      return 'selectedChannel'
    } else {
      return ''
    }
  }

  render(){
    return (
      <Grid.Row divided={true} className={this.isSelected()}>
        <Grid.Column width={2} onClick={() => this.props.setCurrentIns(this.props.instrument)}>
          <h4>{this.props.instrument.name}
          </h4>
          <Button
            compact toggle negative floated='right' size='mini' active={this.props.instrument.options.mute}
            onClick={() => this.props.handleMute(this.props.instrument.id)}>Mute
          </Button>
        </Grid.Column>
        <Grid.Column width={2} floated='left'>
          <Form>
            <Form.Input
               label={`Volume: ${this.props.instrument.options.volume} dB`}
               min={-48}
               max={0}
               name='volume'
               onChange={(e, {value}) => this.handleChange(e, ['volume'],{value})}
               step={1}
               type='range'
               value={this.props.instrument.options.volume}
             />
          </Form>
        </Grid.Column>
        <Grid.Column width={12} verticalAlign='middle'>
          <Sequencer toggleCell={this.toggleCell} instrument={this.props.instrument}
            currentScene={this.props.currentScene} track={this.state.track}
            currentCount={this.props.currentCount} isPlaying={this.props.isPlaying}
          />
        </Grid.Column>
      </Grid.Row>
    )
  }
}
