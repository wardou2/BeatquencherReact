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
    // this.attachSequence = this.attachSequence.bind(this)
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
        this.loadInstrument(ins)
      })
      this.counter=0
      Tone.Transport.scheduleRepeat(this.song, '16n', 0)
    })
  }

  song = (time) => {
    let step = this.counter % 16
    for (let i=0; i < this.state.instruments.length; i++) {

      let track = this.state.tracks.find(t => {
          return (t.instrument_id === this.state.instruments[i].id && t.scene_id === this.props.currentScene.id)
        })

      // console.log('i', i)
      // console.log('step', step)
      // console.log('ins', this.state.instruments[i]);
      // console.log('note', track.notes[step]);

      if (track.notes[step]) {
        if (this.state.instruments[i].ins_type === 'metalsynth') {
          this['ins'+(i+1)].triggerAttackRelease('32n', time)
        } else if (this.state.instruments[i].ins_type === 'noisesynth') {
          this['ins'+(i+1)].triggerAttackRelease('16n', time)
        } else {
          this['ins'+(i+1)].triggerAttackRelease(track.notes[step], '16n', time)
        }
      }
    }
    this.counter++
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
        this['ins'+ins.id] = new Tone.MonoSynth(ins.options)
        this['ins'+ins.id].toMaster()
        break
      case 'polysynth':
        console.log('poly');
        this['ins'+ins.id] = new Tone.PolySynth(ins.options)
        this['ins'+ins.id].toMaster()
        break
      case 'membranesynth':
        console.log('membrane');
        this['ins'+ins.id] = new Tone.MembraneSynth(ins.options)
        this['ins'+ins.id].toMaster()
        break
      case 'metalsynth':
        console.log('metal');
        this['ins'+ins.id] = new Tone.MetalSynth(ins.options)
        this['ins'+ins.id].volume.value = -22
        this['ins'+ins.id].toMaster()
        break
      case 'noisesynth':
        console.log('noise');
        this['ins'+ins.id] = new Tone.NoiseSynth(ins.options)
        this['ins'+ins.id].volume.value = 0
        this['ins'+ins.id].toMaster()
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
    console.log(track);
    let index = tracksCopy.indexOf(t => t.id === track.id)
    if (index >= 0) {tracksCopy[index] = track}
    this.setState({
      tracks: tracksCopy
    })
  }

  playInstruments() {

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
