import React, { Component } from "react";
import { Prompt } from "react-router-dom";
import Tone from "tone";
import SequencerChannels from "./SequencerChannels";
import InstrumentControls from "../components/InstrumentControls";
import { saveInstrument, saveScene } from "../api/Project";
import ProjectControls from "../components/ProjectControls";

import "../styles/project-view.css";

export default class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instruments: [],
            currentIns: {},
            scene: {},
            playing: false,
            count: 0,
            editingTempo: false,
            isModified: false,
            soloInstrument: null,
            liveId: null,
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
        this.handleSolo = this.handleSolo.bind(this);
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

    componentWillUnmount() {
        Tone.Transport.stop();
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
            if (this.state.liveId === ins.id) return;
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
        const instrument = this.state.instruments.find(
            (ins) => ins.id === insId
        );

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
            isModified: true,
        });
    }

    handleChangeEffect(insId, effectInfo, value) {
        const instrumentsCopy = [...this.state.instruments];
        const instrument = this.state.instruments.find(
            (ins) => ins.id === insId
        );
        const effIndex = instrument.effects.findIndex(
            (effect) => effect.eff_type === effectInfo[0]
        );

        instrument.effects[effIndex].eff_options[effectInfo[1]] = value;

        const foundIndex = instrumentsCopy.findIndex((ins) => ins.id === insId);
        instrumentsCopy[foundIndex] = instrument;

        this.setState(
            {
                instruments: instrumentsCopy,
                isModified: true,
            },
            () => {
                if (instrument.effects[effIndex].eff_type === "distortion") {
                    this[`ins${insId}${effectInfo[0]}`][effectInfo[1]] = value;
                } else {
                    this[`ins${insId}${effectInfo[0]}`][
                        effectInfo[1]
                    ].value = value;
                }
            }
        );
    }

    updateTrack(notes, id) {
        const tracksCopy = [...this.state.scene.tracks];
        const index = tracksCopy.findIndex((t) => t.id === id);
        if (index >= 0) {
            tracksCopy[index].notes = notes;
        }
        this.setState({
            scene: {
                ...this.state.scene,
                tracks: tracksCopy,
            },
            isModified: true,
        });
    }

    handleMute(insId) {
        // If an instrument is Solo'd, we don't want a user to be able to
        // re-activate the volume on other instruments
        if (this.state.soloInstrument) return;
        const instrumentsCopy = [...this.state.instruments];
        const instrument = this.state.instruments.find(
            (ins) => ins.id === insId
        );
        instrument.options.mute = !instrument.options.mute;

        const foundIndex = instrumentsCopy.findIndex((ins) => ins.id === insId);
        instrumentsCopy[foundIndex] = instrument;

        this.setState(
            {
                instruments: instrumentsCopy,
                isModified: true,
            },
            () => {
                this[`ins${insId}vol`].mute = !this[`ins${insId}vol`].mute;
            }
        );
    }

    /**
     * @param insId The id of the instrument to be soloed. Mutes all other
     * instruments WITHOUT modifying their mute property in state.
     */
    handleSolo(insId) {
        if (this.state.soloInstrument === insId) {
            // Turn off Solo
            const instrumentsCopy = [...this.state.instruments];
            instrumentsCopy.forEach((instrument) => {
                this[`ins${instrument.id}vol`].mute = instrument.options.mute;
            });

            this.setState({
                soloInstrument: null,
            });
        } else {
            // Turn on Solo
            const instrumentsCopy = [...this.state.instruments];
            instrumentsCopy.forEach((instrument) => {
                this[`ins${instrument.id}vol`].mute = instrument.id !== insId;
            });

            this.setState({
                soloInstrument: insId,
            });
        }
    }

    toggleLive = (id) => {
        if (this.state.liveId === id) {
            this.setState({
                liveId: null,
            });
        } else {
            this.setState({
                liveId: id,
            });
        }
    };

    playNote = (noteEvent) => {
        const { note, type } = noteEvent;

        switch (type) {
            case "attack":
                this[`ins${this.state.liveId}`].triggerAttack(note);
                break;
            case "release":
                this[`ins${this.state.liveId}`].triggerRelease();
                this[`ins${this.state.liveId}`].triggerRelease(note);
                break;
            default:
                break;
        }
    };

    playInstruments() {
        this.setState({
            playing: !this.state.playing,
        });
        Tone.Transport.toggle();
        this.counter = 0;
    }

    saveAll() {
        this.state.instruments.forEach((ins) => {
            saveInstrument({ ins }).catch((err) => console.log(err));
        });
        saveScene({ scene: this.state.scene })
            .then((scene) => this.props.sceneWasSaved(scene))
            .catch((err) => console.log(err));
        this.props.saveProject();
        this.setState({ isModified: false });
    }

    render() {
        return (
            <div className="project-view-content">
                <Prompt
                    when={this.props.loggedIn && this.state.isModified}
                    message="You have unsaved changes, are you sure you want to leave?"
                />
                <ProjectControls
                    playInstruments={this.playInstruments}
                    saveAll={this.saveAll}
                    isPlaying={this.state.playing}
                    loggedIn={this.props.loggedIn}
                    currentProj={this.props.currentProj}
                    handleChangeProj={this.props.handleChangeProj}
                    isModified={this.state.isModified}
                />
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
                    handleSolo={this.handleSolo}
                    soloInstrument={this.state.soloInstrument}
                    liveId={this.state.liveId}
                    toggleLive={this.toggleLive}
                    playNote={this.playNote}
                />
                {!this.isEmpty(this.state.currentIns) && (
                    <InstrumentControls
                        currentIns={this.state.currentIns}
                        handleChangeInstrument={this.handleChangeInstrument}
                        handleChangeEffect={this.handleChangeEffect}
                    />
                )}
            </div>
        );
    }
}
