import React from 'react'
import Tone from 'tone';

const Monosynth = (props) => {
  let synth = new Tone.MonoSynth({options: props.ins['options']}).toMaster()

  let seq = new Tone.Sequence((time, note) => {
    synth.triggerAttackRelease(note, '4n');
  }, ["C3", [null, "Eb3"], ["F4", "Bb4", "C5"]], "4n").start(0)

  return(synth)
}

export default Monosynth
