import Tone from "tone";

const Monosynth = (props) => {
    const synth = new Tone.MonoSynth({ options: props.ins.options }).toMaster();

    new Tone.Sequence(
        (_time, note) => {
            synth.triggerAttackRelease(note, "4n");
        },
        ["C3", [null, "Eb3"], ["F4", "Bb4", "C5"]],
        "4n"
    ).start(0);

    return synth;
};

export default Monosynth;
