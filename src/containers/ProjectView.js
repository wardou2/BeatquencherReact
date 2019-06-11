import React, { Component } from 'react'
import SequencerChannels from './SequencerChannels'
import Tone from 'tone';
import InstrumentControls from '../components/InstrumentControls'
import Monosynth from '../components/Monosynth'

export default class ProjectView extends Component {

  constructor(props){
    super(props)
    this.state = {
      instruments: [],
      currentIns: {}
    }
    this.setCurrentIns = this.setCurrentIns.bind(this)
    this.loadInstruments = this.loadInstruments.bind(this)
    this.handleChangeInstrument = this.handleChangeInstrument.bind(this)
    this.playInstruments = this.playInstruments.bind(this)
  }

  componentDidMount() {
    this.setState({
      instruments: this.props.currentProj.instruments,
      tracks: this.props.currentProj.tracks
    }, () => {
      this.state.instruments.map((ins, i) => {
        this.loadInstruments(ins)
      })
    })
  }

  setCurrentIns(ins) {
    this.setState({
      currentIns: ins
    })
  }

  loadInstruments(ins) {
    console.log('here');
    switch (ins.ins_type) {
      case 'monosynth':
        console.log('mono');
          let synth = new Tone.MonoSynth({options: ins['options']}).toMaster()
          let seq = new Tone.Sequence((time, note) => {
          	synth.triggerAttackRelease(note, '4n');
          }, ["C3", [null, "Eb3"], ["F4", "Bb4", "C5"]], "4n").start(0)
          return synth
        break
      default:
        return null
    }
  }

  handleChangeInstrument(ins_id, field, value) {
    let instrumentsCopy = [...this.state.instruments]
    let instrument = this.state.instruments.filter(ins => ins.id === ins_id)[0]

    instrument["options"][field[0]][field[1]] = value

    let foundIndex = instrumentsCopy.findIndex(ins => ins.id === ins_id)
    instrumentsCopy[foundIndex] = instrument

    this.setState({
      instruments: instrumentsCopy
    })
  }

  playInstruments() {
    console.log('here');

    Tone.Transport.toggle()
  }

  render() {

    return (
      <div>
        <h1>{this.props.currentProj.title} - {this.props.currentScene.name}</h1>
        <button onClick={() => this.playInstruments()}>Play</button>
        <SequencerChannels
          instruments={this.state.instruments} currentScene={this.props.currentScene}
          tracks={this.props.currentProj.tracks} setCurrentIns={this.setCurrentIns}
        />
        <InstrumentControls
          currentIns={this.state.currentIns} handleChangeInstrument={this.handleChangeInstrument}
        />
      </div>
    )
  }
}
