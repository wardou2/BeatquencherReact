import React, { Component } from 'react'
import Channel from '../components/Channel'
import { Container, Grid } from 'semantic-ui-react'

export default class SequencerChannels extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  renderChannels() {

    if (this.props.instruments) {
      return this.props.instruments.map(ins => {
         return  <Channel
            key={ins.id} instrument={ins} currentScene={this.props.currentScene}
            tracks={this.props.tracks} setCurrentIns={this.props.setCurrentIns}
            updateTrack={this.props.updateTrack} handleChangeInstrument={this.props.handleChangeInstrument}
            handleMute={this.props.handleMute} currentIns={this.props.currentIns}
            isPlaying={this.props.isPlaying} currentCount={this.props.currentCount}
          />
      })
    }
  }

  render(){
    return(
      <Grid centered={true} columns={16} divided='vertically' celled={true}>
        {this.renderChannels()}
      </Grid>
    )
  }
}
