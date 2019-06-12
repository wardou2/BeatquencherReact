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
      currentIns: {},
      properIns: [],
      tracks: []
    }
    this.setCurrentIns = this.setCurrentIns.bind(this)
    this.loadInstrument = this.loadInstrument.bind(this)
    this.handleChangeInstrument = this.handleChangeInstrument.bind(this)
    this.playInstruments = this.playInstruments.bind(this)
    this.attachSequence = this.attachSequence.bind(this)
    this.updateTrack = this.updateTrack.bind(this)
    // this.renderInstruments = this.renderInstruments.bind(this)
  }

  componentDidMount() {
    Tone.Transport.bpm.value = this.props.currentProj.tempo
    this.setState({
      instruments: this.props.currentProj.instruments,
      tracks: this.props.currentProj.tracks
    }, () => {
      this.state.instruments.map((ins) => {
        this['ins'+ins.id] = this.loadInstrument(ins)
        this['ins'+ins.id].toMaster()
        // this.attachSequence(ins, [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])
      })
      // this.attachSequence(['C3',null,'D3', null,'E4','C3','C3','C3','C3','C3','C3','C3','C3','C3','C3','C3'])
      // this.attachSequence(["C3", [null, "Eb3"], ["F4", "Bb4", "C5"], "B3"])
    })
  }

  attachSequence(ins) {
    // this['ins'+ins.id].disconnect()
    let track = this.state.tracks.find(t => {
      return (t.instrument_id === ins.id && t.scene_id === this.props.currentScene.id)
    })

    let seq = new Tone.Sequence((time, note ) => {
      this['ins'+ins.id].triggerAttackRelease(note, '8n');
    }, track.notes, "4n").start(0)
  }

  setCurrentIns(ins) {
    this.setState({
      currentIns: ins
    })
  }

  loadInstrument(ins) {
    switch (ins.ins_type) {
      case 'monosynth':
        console.log('mono');
        return new Tone.MonoSynth(ins.options)
        break
      case 'polysynth':
        console.log('poly');
        return new Tone.PolySynth(ins.options)
        break
      case 'membranesynth':
        console.log('membrane');
        return new Tone.MembraneSynth(ins.options)
        break
      case 'metalsynth':
        console.log('metal');
        return new Tone.MetalSynth(ins.options)
        break
      case 'noisesynth':
        console.log('noise');
        return new Tone.NoiseSynth(ins.options)
        break
    }
  }

  handleChangeInstrument(ins_id, field, value) {
    console.log('change');
    let instrumentsCopy = [...this.state.instruments]
    let instrument = this.state.instruments.filter(ins => ins.id === ins_id)[0]

    instrument["options"][field[0]][field[1]] = value

    let foundIndex = instrumentsCopy.findIndex(ins => ins.id === ins_id)
    instrumentsCopy[foundIndex] = instrument

    this.setState({
      instruments: instrumentsCopy
    })

    this['ins'+ins_id][field[0]][field[1]] = value
  }

  updateTrack(track) {
    let tracksCopy = [...this.state.tracks]
    let index = tracksCopy.indexOf(t => t.id === track.id)
    if (index >= 0) {tracksCopy[index] = track}
    this.setState({
      tracks: tracksCopy
    })
  }

  playInstruments() {
    this.state.instruments.map(ins => {
      this.attachSequence(ins)
    })
    Tone.Transport.toggle()
  }

  render() {

    return (
      <div>
        <h1>{this.props.currentProj.title} - {this.props.currentScene.name}</h1>
        <button onClick={() => this.playInstruments()}>Play</button>
        <SequencerChannels
          instruments={this.state.instruments} currentScene={this.props.currentScene}
          tracks={this.state.tracks} setCurrentIns={this.setCurrentIns} updateTrack={this.updateTrack}
        />
        <InstrumentControls
          currentIns={this.state.currentIns} handleChangeInstrument={this.handleChangeInstrument}
        />
      </div>
    )
  }
}
