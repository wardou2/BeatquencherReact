import React, { Component } from 'react'
import Sequencer from './Sequencer'
import { Container } from 'semantic-ui-react'

export default class Channel extends Component {

  constructor(props){
    super(props)
    this.state = {
      track: {

      }
    }
    this.toggleCell = this.toggleCell.bind(this)
  }

  componentDidMount() {
    let track = this.props.tracks.find(t => {
      return (t.scene_id === this.props.currentScene.id && t.instrument_id === this.props.instrument.id)
    })
    this.setState({track})
  }

  toggleCell(i) {
    let notesCopy = this.state.track.notes
    if (notesCopy[i] === '1') {
      notesCopy[i] = '0'
    } else {
      notesCopy[i] = '1'
    }
    this.setState({
      track: {
        ...this.state.track,
        notes: notesCopy
      }
    })
  }

  render(){
    return (
      <div onClick={() => this.props.setCurrentIns(this.props.instrument)}>
        <span> {this.props.instrument.ins_type} </span>
        <Container>
          <Sequencer toggleCell={this.toggleCell} instrument={this.props.instrument}
            currentScene={this.props.currentScene} track={this.state.track}
          />
        </Container>
      </div>
    )
  }
}
