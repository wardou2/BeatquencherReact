import React from 'react'
import Tone from 'tone';

const Monosynth = (props) => {
  let synth = new Tone.MonoSynth({options: props.ins['options']}).toMaster()
  synth.triggerAttackRelease('A3', '4n')
  return(synth)
}

export default Monosynth
