import React, { Component } from 'react'
import SequencerChannels from './SequencerChannels'
import Tone from 'tone';
import InstrumentControls from '../components/InstrumentControls'
import Monosynth from '../components/Monosynth'
import * as edit from '../components/ContentEditable'
import { Container, Form, Button, Icon } from 'semantic-ui-react'
import Cookies from 'js-cookie'
import {BASE_URL} from '../api_url'

export default class ProjectView extends Component {

  constructor(props){
    super(props)
    this.state = {
      instruments: [],
      currentIns: {},
      properIns: [],
      tracks: [],
      playing: false,
      count: 0
    }
    this.setCurrentIns = this.setCurrentIns.bind(this)
    this.loadInstrument = this.loadInstrument.bind(this)
    this.handleChangeInstrument = this.handleChangeInstrument.bind(this)
    this.playInstruments = this.playInstruments.bind(this)
    this.updateTrack = this.updateTrack.bind(this)
    this.attachEffects = this.attachEffects.bind(this)
    this.handleChangeEffect = this.handleChangeEffect.bind(this)
    this.handleMute = this.handleMute.bind(this)
    this.handleChangeProject = this.handleChangeProject.bind(this)
    this.saveAll = this.saveAll.bind(this)
  }

  componentDidMount() {
    console.log('here');
    Tone.Transport.bpm.value = this.props.currentProj.tempo
    let currentTracks = this.props.currentProj.tracks.filter(track => {
      return track.scene_id === this.props.currentScene.id
    })

    currentTracks.map(t => {
      let notesCopy = []
      t.notes.map(n => {
        if (n.includes('-')) {
          notesCopy.push(n.split('-'))
        } else {
          notesCopy.push(n)
        }
      })
      t.notes = notesCopy

    })

    this.setState({
      instruments: this.props.currentProj.instruments,
      tracks: currentTracks
    }, () => {

      this.counter=0
      const masterCompressor = new Tone.Compressor({
        threshold: -20,
        ratio: 12,
        attack: 0,
        release: 0.3
      });

      Tone.Master.chain(masterCompressor)
      Tone.Transport.scheduleRepeat(this.song, '16n', 0)
      this.state.instruments.map((ins) => {
        this.loadInstrument(ins)
      })
    })
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  song = (time) => {
    let step = this.counter % 16
    this.state.instruments.forEach(ins => {

      let track = this.state.tracks.find(t => {
          return (t.instrument_id === ins.id && t.scene_id === this.props.currentScene.id)
        })

      // console.log('step', step)
      // console.log('ins', ins);
      // console.log('note', track.notes[step]);

      if (track.notes[step]) {
        if (ins.ins_type === 'closed_hihat') {
          this['ins'+ins.id].triggerAttackRelease('16n', time)
        } else if (ins.ins_type === 'open_hihat') {
          this['ins'+ins.id].triggerAttackRelease('8n', time)
        } else if (ins.ins_type === 'snare') {
          this['ins'+ins.id].triggerAttackRelease('16n', time)
        } else if (ins.ins_type === 'polysynth') {
          this['ins'+ins.id].triggerAttackRelease(track.notes[step], '8n', time)
        } else {
          this['ins'+ins.id].triggerAttackRelease(track.notes[step], '16n', time)
        }
      }
    })
    this.setState({
      count: this.state.count+1
    })
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
        this['ins'+ins.id] = new Tone.MonoSynth()
        this['ins'+ins.id].set(ins.options)
        this.attachEffects(ins)
        break
      case 'polysynth':

        console.log('poly');
        this['ins'+ins.id] = new Tone.PolySynth(ins.options.polyphony, Tone.MonoSynth)

        if (ins.options.oscillator.type.slice(0,2) === 'fm') {
          let insCopy = JSON.parse(JSON.stringify(ins))
          delete insCopy.options.oscillator
          this['ins'+ins.id].set(insCopy.options)
          this['ins'+ins.id].set({'oscillator': {'type': ins.options.oscillator.type}})
        } else {
          this['ins'+ins.id].set(ins.options)
        }
        this.attachEffects(ins)
        break
      case 'bass_drum':
        console.log('membrane');
        this['ins'+ins.id] = new Tone.MembraneSynth(ins.options)
        console.log(this['ins'+ins.id]);
        this.attachEffects(ins)
        // this['ins'+ins.id].toMaster()
        break
      case 'closed_hihat':
        console.log('metal');
        this['ins'+ins.id] = new Tone.MetalSynth(ins.options)
        // this['ins'+ins.id].toMaster()
        this.attachEffects(ins)
        break
      case 'open_hihat':
        console.log('metal');
        this['ins'+ins.id] = new Tone.MetalSynth(ins.options)
        // this['ins'+ins.id].toMaster()
        this.attachEffects(ins)
        break
      case 'snare':
        console.log('noise');
        this['ins'+ins.id] = new Tone.NoiseSynth(ins.options)
        this.attachEffects(ins)
        break
    }
  }

  attachEffects(ins) {
    this['ins'+ins.id+'vol'] = new Tone.Volume()
    this['ins'+ins.id+'vol'].mute = ins.options.mute || false
    if (!this.isEmpty(ins.effects)) {
      ins.effects.forEach((effect, i) => {
        switch (effect.eff_type) {
          case "filter":
            this['ins'+ins.id+effect.eff_type] = new Tone.Filter(effect.eff_options.frequency, "lowpass")
            break
          case "reverb":
            this['ins'+ins.id+effect.eff_type] = new Tone.Reverb()
            this['ins'+ins.id+effect.eff_type].generate()
            this['ins'+ins.id+effect.eff_type].wet.value = effect.eff_options.wet
            break
          case "distortion":
            this['ins'+ins.id+effect.eff_type] = new Tone.Distortion(effect.eff_options.distortion)
        }
      })

      if (ins.effects.length === 1) {
        this['ins'+ins.id].connect(this['ins'+ins.id+ins.effects[0].eff_type])
        this['ins'+ins.id+ins.effects[0].eff_type].chain(this['ins'+ins.id+'vol'], Tone.Master)
      } else if (ins.effects.length === 2) {
        this['ins'+ins.id].connect(this['ins'+ins.id+ins.effects[0].eff_type])
        this['ins'+ins.id+ins.effects[0].eff_type].connect(this['ins'+ins.id+ins.effects[1].eff_type])
        this['ins'+ins.id+ins.effects[1].eff_type].chain(this['ins'+ins.id+'vol'], Tone.Master)
      } else {
        console.log('unfinished else');
        // for (let i=0; i < ins.effects.length; i++) {
        //   if (i === ins.effects.length-1) {
        //     this['ins'+ins.id+'_eff'+i].toMaster()
        //     console.log(this['ins'+ins.id+'_eff'+i]);
        //   } else if (i === 0) {
        //     this['ins'+ins.id].connect(this['ins'+ins.id+'_eff'+i])
        //   } else {
        //     this['ins'+ins.id+'_eff'+i].connect(this['ins'+ins.id+'_eff'+i-1])
        //   }
        // }
      }
    } else {
      this['ins'+ins.id].chain(this['ins'+ins.id+'vol'], Tone.Master)
    }
  }

  handleChangeInstrument(ins_id, field, val) {
    let value = ((field[1] && field[1] === 'type')) ? val : parseFloat(val)
    let instrumentsCopy = [...this.state.instruments]
    let instrument = this.state.instruments.filter(ins => ins.id === ins_id)[0]

    if (field[1]) {
      instrument["options"][field[0]][field[1]] = value
      this['ins'+ins_id].set({[field[0]]: {[field[1]]: value}})
    } else {
      instrument["options"][field[0]] = value
      this['ins'+ins_id].set({[field[0]]: value})
    }

    let foundIndex = instrumentsCopy.findIndex(ins => ins.id === ins_id)
    instrumentsCopy[foundIndex] = instrument

    this.setState({
      instruments: instrumentsCopy
    })
  }

  handleChangeEffect(ins_id, effect_info, value) {
    let instrumentsCopy = [...this.state.instruments]
    let instrument = this.state.instruments.filter(ins => ins.id === ins_id)[0]
    let eff_index = instrument.effects.findIndex(effect => effect.eff_type === effect_info[0])

    instrument.effects[eff_index].eff_options[effect_info[1]] = value.value

    let foundIndex = instrumentsCopy.findIndex(ins => ins.id === ins_id)
    instrumentsCopy[foundIndex] = instrument

    this.setState({
      instruments: instrumentsCopy
    }, () => {
      if (instrument.effects[eff_index].eff_type === 'distortion') {
        this['ins'+ins_id+effect_info[0]][effect_info[1]] = value.value
      } else {
        this['ins'+ins_id+effect_info[0]][effect_info[1]].value = value.value
      }
    })
  }

  updateTrack(track) {
    let tracksCopy = [...this.state.tracks]
    let index = tracksCopy.indexOf(t => t.id === track.id)
    if (index >= 0) {tracksCopy[index] = track}
    this.setState({
      tracks: tracksCopy
    })
  }

  handleMute(ins_id) {
    let instrumentsCopy = [...this.state.instruments]
    let instrument = this.state.instruments.filter(ins => ins.id === ins_id)[0]
    instrument.options.mute = !instrument.options.mute

    let foundIndex = instrumentsCopy.findIndex(ins => ins.id === ins_id)
    instrumentsCopy[foundIndex] = instrument

    this.setState({
      instruments: instrumentsCopy
    }, () => this['ins'+ins_id+'vol'].mute = !this['ins'+ins_id+'vol'].mute)
  }

  handleChangeProject(field, value) {
    this.props.handleChangeProject(field, value)
  }

  playInstruments() {
    this.setState({
      playing: !this.state.playing
    })

    Tone.Transport.toggle()
  }

  saveAll() {
    this.saveInstruments()
    this.saveTracks()
    this.props.saveProject()
    this.props.saveScene()
  }

  saveInstruments = () => {
    this.state.instruments.forEach(ins => {
      fetch(BASE_URL+'instruments/'+ins.id, {
        method: 'PATCH',
        headers: {
          'id_token': Cookies.get('id_token'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({instrument: {
          ins_type: ins.ins_type,
          options: ins.options,
          effects: ins.effects
        }})
      })
    })
  }

  saveTracks = () => {

    this.state.tracks.forEach(track => {
      let trackCopy = Object.assign({}, track);
      let notesCopy = []

      trackCopy.notes.forEach(n => {
        if (Array.isArray(n)) {
          notesCopy.push(n.join('-'))
        } else {
          notesCopy.push(n)
        }
      })

      trackCopy.notes = notesCopy

      fetch(BASE_URL+'tracks/'+trackCopy.id, {
          method: 'PATCH',
          headers: {
              'id_token': Cookies.get('id_token'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({track: trackCopy})
          })
          .then(res => res.json())
          .then(json => console.log(json))
    })
  }

  handleChangeTempo = (field, value) => {
    this.handleChangeProject(['tempo'], value)
    Tone.Transport.bpm.value = value.value
  }

  render() {

    let EditableSceneName = edit.contentEditable('h2')

    return (
      <div className='project-view-div'>
        <div className='project-info-div'>
          <EditableSceneName className='clickable' value={this.props.currentScene.name} onSave={(val) => this.props.handleChangeScene(['name'], val)}/>
          <Form size="small">
            <Form.Group>
              <Button icon onClick={() => this.playInstruments()}>
                {(this.state.playing) ?  <Icon name='pause'/> : <Icon name='play'/>}
              </Button>
              <Button icon onClick={() => this.saveAll()}>
                <Icon name='save'/>
              </Button>
               <Form.Input
                label="Tempo (bpm)"
                 name='tempo'
                 fluid
                 onChange={(e, {value}) => this.handleChangeTempo(['tempo'], {value})}
                 type='number'
                 value={this.props.currentProj.tempo}
               />
             </Form.Group>
          </Form>
        </div>
        <br></br>
        <SequencerChannels
          instruments={this.state.instruments} currentScene={this.props.currentScene}
          handleChangeInstrument={this.handleChangeInstrument} handleMute={this.handleMute}
          tracks={this.state.tracks} setCurrentIns={this.setCurrentIns} updateTrack={this.updateTrack}
          currentIns={this.state.currentIns} isPlaying ={this.state.playing} currentCount={this.counter}
        />
        <InstrumentControls
          currentIns={this.state.currentIns} handleChangeInstrument={this.handleChangeInstrument}
          handleChangeEffect={this.handleChangeEffect}
        />
      </div>
    )
  }
}
