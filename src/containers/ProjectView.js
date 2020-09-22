import React, { Component } from "react";
import Tone from "tone";
import { Form, Button, Icon } from "semantic-ui-react";
import SequencerChannels from "./SequencerChannels";
import InstrumentControls from "../components/InstrumentControls";
import * as edit from "../components/ContentEditable";
import { saveInstrument, saveScene } from "../api/Project";

export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            currentIns: {},
            scene: {},
            playing: false,
            count: 0,
        };
        this.setCurrentIns = this.setCurrentIns.bind(this);
        this.song = this.song.bind(this);
        this.loadInstrument = this.loadInstrument.bind(this);
        this.handleChangeInstrument = this.handleChangeInstrument.bind(this);
        this.playInstruments = this.playInstruments.bind(this);
        this.updateTrack = this.updateTrack.bind(this);
        this.attachEffects = this.attachEffects.bind(this);
        this.handleChangeEffect = this.handleChangeEffect.bind(this);
        this.handleMute = this.handleMute.bind(this);
        this.saveAll = this.saveAll.bind(this);
    }

    componentDidMount() {
        // Store Instruments and Scene in state here.
        Tone.Transport.bpm.value = this.props.currentProj.tempo;
        const currentScene = JSON.parse(
            JSON.stringify(this.props.currentScene)
        );
        // Sanitize Tracks
        // TODO: Can this be removed?
        currentScene.tracks.forEach((track, i) => {
            const notesCopy = [];
            track.notes.forEach((n) => {
                if (n.includes("-")) {
                    notesCopy.push(n.split("-"));
                } else {
                    notesCopy.push(n);
                }
            });
            currentScene.tracks[i].notes = notesCopy;
        });

        const instrumentsCopy = JSON.parse(
            JSON.stringify(this.props.currentProj.instruments)
        );
        instrumentsCopy.sort((a, b) => (a.id < b.id ? 1 : -1));
        this.setState(
            {
                instruments: instrumentsCopy,
                scene: currentScene,
            },
            () => {
                this.counter = 0;
                const masterCompressor = new Tone.Compressor({
                    threshold: -20,
                    ratio: 12,
                    attack: 0,
                    release: 0.3,
                });

                Tone.Master.chain(masterCompressor);
                Tone.Transport.scheduleRepeat(this.song, "16n", 0);
                this.state.instruments.forEach((ins) => {
                    this.loadInstrument(ins);
                });
            }
        );
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    song(time) {
        const step = this.counter % 16;
        this.state.instruments.forEach((ins) => {
            const track = this.state.scene.tracks.find((t) => {
                return t.instrument === ins.id;
            });
            if (track.notes[step]) {
                if (ins.ins_type === "closed_hihat") {
                    this[`ins${ins.id}`].triggerAttackRelease("16n", time);
                } else if (ins.ins_type === "open_hihat") {
                    this[`ins${ins.id}`].triggerAttackRelease("8n", time);
                } else if (ins.ins_type === "snare") {
                    this[`ins${ins.id}`].triggerAttackRelease("16n", time);
                } else if (ins.ins_type === "polysynth") {
                    this[`ins${ins.id}`].triggerAttackRelease(
                        track.notes[step],
                        "8n",
                        time
                    );
                } else {
                    this[`ins${ins.id}`].triggerAttackRelease(
                        track.notes[step],
                        "16n",
                        time
                    );
                }
            }
        });
        this.setState({
            count: this.state.count + 1,
        });
        this.counter += 1;
    }

    setCurrentIns(ins) {
        this.setState({
            currentIns: ins,
        });
    }

    loadInstrument(ins) {
        switch (ins.ins_type) {
            case "monosynth":
                this[`ins${ins.id}`] = new Tone.MonoSynth();
                this[`ins${ins.id}`].set(ins.options);
                this.attachEffects(ins);
                break;

            case "polysynth":
                this[`ins${ins.id}`] = new Tone.PolySynth(
                    ins.options.polyphony,
                    Tone.MonoSynth
                );
                if (ins.options.oscillator.type.slice(0, 2) === "fm") {
                    // Tone js gets really mad if you instantiate fm type oscillators on polysynths the same way you would others. Had to do this workaround
                    const insCopy = JSON.parse(JSON.stringify(ins));
                    delete insCopy.options.oscillator;
                    this[`ins${ins.id}`].set(insCopy.options);
                    this[`ins${ins.id}`].set({
                        oscillator: { type: ins.options.oscillator.type },
                    });
                } else {
                    this[`ins${ins.id}`].set(ins.options);
                }
                this.attachEffects(ins);
                break;

            case "bass_drum":
                this[`ins${ins.id}`] = new Tone.MembraneSynth(ins.options);
                this.attachEffects(ins);
                break;

            case "closed_hihat":
                this[`ins${ins.id}`] = new Tone.MetalSynth(ins.options);
                this.attachEffects(ins);
                break;

            case "open_hihat":
                this[`ins${ins.id}`] = new Tone.MetalSynth(ins.options);
                this.attachEffects(ins);
                break;

            case "snare":
                this[`ins${ins.id}`] = new Tone.NoiseSynth(ins.options);
                this.attachEffects(ins);
                break;
            default:
                break;
        }
    }

    attachEffects(ins) {
        this[`ins${ins.id}vol`] = new Tone.Volume();
        this[`ins${ins.id}vol`].mute = ins.options.mute || false;
        if (!this.isEmpty(ins.effects)) {
            ins.effects.forEach((effect, i) => {
                switch (effect.eff_type) {
                    case "filter":
                        this[
                            `ins${ins.id}${effect.eff_type}`
                        ] = new Tone.Filter(
                            effect.eff_options.frequency,
                            "lowpass"
                        );
                        break;
                    case "reverb":
                        this[
                            `ins${ins.id}${effect.eff_type}`
                        ] = new Tone.Reverb();
                        this[`ins${ins.id}${effect.eff_type}`].generate();
                        this[`ins${ins.id}${effect.eff_type}`].wet.value =
                            effect.eff_options.wet;
                        break;
                    case "distortion":
                        this[
                            `ins${ins.id}${effect.eff_type}`
                        ] = new Tone.Distortion(effect.eff_options.distortion);
                        break;
                    default:
                        break;
                }
            });

            if (ins.effects.length === 1) {
                this[`ins${ins.id}`].connect(
                    this[`ins${ins.id}${ins.effects[0].eff_type}`]
                );
                this[`ins${ins.id}${ins.effects[0].eff_type}`].chain(
                    this[`ins${ins.id}vol`],
                    Tone.Master
                );
            } else if (ins.effects.length === 2) {
                this[`ins${ins.id}`].connect(
                    this[`ins${ins.id}${ins.effects[0].eff_type}`]
                );
                this[`ins${ins.id}${ins.effects[0].eff_type}`].connect(
                    this[`ins${ins.id}${ins.effects[1].eff_type}`]
                );
                this[`ins${ins.id}${ins.effects[1].eff_type}`].chain(
                    this[`ins${ins.id}vol`],
                    Tone.Master
                );
            } else {
                // for (let i=0; i < ins.effects.length; i++) {
                //   if (i === ins.effects.length-1) {
                //     this['ins'+ins.id+'_eff'+i].toMaster()
                //   } else if (i === 0) {
                //     this['ins'+ins.id].connect(this['ins'+ins.id+'_eff'+i])
                //   } else {
                //     this['ins'+ins.id+'_eff'+i].connect(this['ins'+ins.id+'_eff'+i-1])
                //   }
                // }
            }
        } else {
            this[`ins${ins.id}`].chain(this[`ins${ins.id}vol`], Tone.Master);
        }
    }

    handleChangeInstrument(insId, field, val) {
        const value = field[1] && field[1] === "type" ? val : parseFloat(val);
        const instrumentsCopy = [...this.state.instruments];
        const instrument = this.state.instruments.filter(
            (ins) => ins.id === insId
        )[0];

        if (field[1]) {
            instrument.options[field[0]][field[1]] = value;
            this[`ins${insId}`].set({ [field[0]]: { [field[1]]: value } });
        } else {
            instrument.options[field[0]] = value;
            this[`ins${insId}`].set({ [field[0]]: value });
        }

        const foundIndex = instrumentsCopy.findIndex((ins) => ins.id === insId);
        instrumentsCopy[foundIndex] = instrument;

        this.setState({
            instruments: instrumentsCopy,
        });
    }

    handleChangeEffect(insId, effectInfo, value) {
        const instrumentsCopy = [...this.state.instruments];
        const instrument = this.state.instruments.filter(
            (ins) => ins.id === insId
        )[0];
        const effIndex = instrument.effects.findIndex(
            (effect) => effect.eff_type === effectInfo[0]
        );

        instrument.effects[effIndex].eff_options[effectInfo[1]] = value.value;

        const foundIndex = instrumentsCopy.findIndex((ins) => ins.id === insId);
        instrumentsCopy[foundIndex] = instrument;

        this.setState(
            {
                instruments: instrumentsCopy,
            },
            () => {
                if (instrument.effects[effIndex].eff_type === "distortion") {
                    this[`ins${insId}${effectInfo[0]}`][effectInfo[1]] =
                        value.value;
                } else {
                    this[`ins${insId}${effectInfo[0]}`][effectInfo[1]].value =
                        value.value;
                }
            }
        );
    }

    updateTrack(notes, id) {
        const tracksCopy = [...this.state.scene.tracks];
        const index = tracksCopy.indexOf((t) => t.id === id);
        if (index >= 0) {
            tracksCopy[index].notes = notes;
        }
        this.setState({
            scene: {
                ...this.state.scene,
                tracks: tracksCopy,
            },
        });
    }

    handleMute(insId) {
        const instrumentsCopy = [...this.state.instruments];
        const instrument = this.state.instruments.filter(
            (ins) => ins.id === insId
        )[0];
        instrument.options.mute = !instrument.options.mute;

        const foundIndex = instrumentsCopy.findIndex((ins) => ins.id === insId);
        instrumentsCopy[foundIndex] = instrument;

        this.setState(
            {
                instruments: instrumentsCopy,
            },
            () => {
                this[`ins${insId}vol`].mute = !this[`ins${insId}vol`].mute;
            }
        );
    }

    playInstruments() {
        this.setState({
            playing: !this.state.playing,
        });

        Tone.Transport.toggle();
    }

    saveAll() {
        this.state.instruments.forEach((ins) => {
            saveInstrument({ ins }).catch((err) => console.log(err));
        });
        this.props
            .saveScene({ scene: this.state.scene })
            .catch((err) => console.log(err));
        this.props.saveProject();
    }

    handleChangeTempo = (tempo) => {
        this.props.handleChangeProj("tempo", tempo);
        Tone.Transport.bpm.value = tempo;
    };

    render() {
        const EditableSceneName = edit.contentEditable("h2");

        return (
            <div className="project-view-div">
                <div className="project-info-div">
                    <EditableSceneName
                        className="clickable"
                        value={this.state.scene.name}
                        onSave={(val) =>
                            this.props.handleChangeScene(["name"], val)
                        }
                    />
                    <Form size="small">
                        <Form.Group>
                            <Button icon onClick={() => this.playInstruments()}>
                                {this.state.playing ? (
                                    <Icon name="pause" />
                                ) : (
                                    <Icon name="play" />
                                )}
                            </Button>
                            <Button
                                icon
                                onClick={() => this.saveAll()}
                                disabled={!this.props.loggedIn}
                            >
                                <Icon name="save" />
                            </Button>
                            <Form.Input
                                label="Tempo (bpm)"
                                name="tempo"
                                fluid
                                onChange={(e, { value }) =>
                                    this.handleChangeTempo(value)
                                }
                                type="number"
                                value={this.props.currentProj.tempo}
                            />
                        </Form.Group>
                    </Form>
                </div>
                <br></br>
                <SequencerChannels
                    instruments={this.state.instruments}
                    tracks={this.state.scene.tracks}
                    handleChangeInstrument={this.handleChangeInstrument}
                    handleMute={this.handleMute}
                    setCurrentIns={this.setCurrentIns}
                    updateTrack={this.updateTrack}
                    currentIns={this.state.currentIns}
                    isPlaying={this.state.playing}
                    currentCount={this.counter}
                />
                <InstrumentControls
                    currentIns={this.state.currentIns}
                    handleChangeInstrument={this.handleChangeInstrument}
                    handleChangeEffect={this.handleChangeEffect}
                />
            </div>
        );
    }
}
