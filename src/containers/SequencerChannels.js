import React, { Component } from 'react'
import Channel from '../components/Channel'

export default class SequencerChannels extends Component {

  constructor(props){
    super(props)
    this.state = {}
  }

  renderChannels() {

    if (this.props.instruments) {
      return this.props.instruments.map(ins => {
         return <Channel
          key={ins.id} instrument={ins} currentScene={this.props.currentScene}
          tracks={this.props.tracks} setCurrentIns={this.props.setCurrentIns}
        />
      })
    }
  }

  render(){
    return(
      <React.Fragment>
        {this.renderChannels()}
      </React.Fragment>
    )
  }
}
