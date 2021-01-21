import React, { Component } from "react";
import Sequencer from "./Sequencer";
import "../index.css";
import EditNoteModal from "./EditNoteModal";
import ChannelSlider from "./ChannelSlider";

export default class Channel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            track: {},
            currentI: 0,
            currentNote: "",
            showModal: false,
        };
        this.toggleCell = this.toggleCell.bind(this);
        this.getRightNote = this.getRightNote.bind(this);
        this.isSelected = this.isSelected.bind(this);
        this.turnShowOff = this.turnShowOff.bind(this);
        this.chooseNotes = this.chooseNotes.bind(this);
    }

    getRightNote() {
        // Closed Hihat needs different own note to sound good
        // TODO: Can this be done elsewhere? Seems inefficient
        switch (this.props.instrument.ins_type) {
            case "closed_hihat":
                return "C4";
            default:
                return "F1";
        }
    }

    chooseNotes(note, active) {
        const notesCopy = this.props.track.notes;
        notesCopy[this.state.currentI] = active ? note : "";

        this.props.updateTrack(notesCopy, this.props.track.id);
        this.turnShowOff();
    }

    toggleCell(i, instrument) {
        if (!instrument.melodic) {
            const notesCopy = this.props.track.notes;
            if (notesCopy[i]) {
                notesCopy[i] = "";
            } else {
                notesCopy[i] = this.getRightNote();
            }

            this.props.updateTrack(notesCopy, this.props.track.id);
        } else {
            this.setState({
                showModal: true,
                currentNote: this.props.track.notes[i],
                currentI: i,
            });
        }
    }

    turnShowOff() {
        this.setState({
            showModal: false,
        });
    }

    handleChange(e, field, value) {
        this.props.handleChangeInstrument(
            this.props.instrument.id,
            field,
            value
        );
    }

    isSelected() {
        if (this.props.currentIns.id === this.props.instrument.id) {
            return "selected-channel";
        }
        return "";
    }

    render() {
        return (
            <div
                className={`sequencer-channel ${this.isSelected()}`}
                onClick={() => this.props.setCurrentIns(this.props.instrument)}
            >
                <div className="sequencer-channel--cell">
                    <div className="channel-cell--name">
                        <h4>{this.props.instrument.name}</h4>
                        <div className="channel-cell--name--buttons">
                            <div
                                title="Mute"
                                onClick={() =>
                                    this.props.handleMute(
                                        this.props.instrument.id
                                    )
                                }
                                className={
                                    this.props.instrument.options.mute
                                        ? "channel-button channel-button--active"
                                        : "channel-button"
                                }
                            >
                                M
                            </div>
                            <div
                                title="Solo"
                                onClick={() =>
                                    this.props.handleSolo(
                                        this.props.instrument.id
                                    )
                                }
                                className={
                                    this.props.instrument.id ===
                                    this.props.soloInstrument
                                        ? "channel-button channel-button--active"
                                        : "channel-button"
                                }
                            >
                                S
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sequencer-channel--cell">
                    <ChannelSlider
                        label={`Volume: ${this.props.instrument.options.volume} dB`}
                        min={-48}
                        max={0}
                        name="volume"
                        callback={(e) =>
                            this.handleChange(e, ["volume"], e.target.value)
                        }
                        step={1}
                        type="range"
                        value={this.props.instrument.options.volume}
                    />
                </div>
                <div className="sequencer-channel--notes">
                    <Sequencer
                        toggleCell={this.toggleCell}
                        instrument={this.props.instrument}
                        currentScene={this.props.currentScene}
                        track={this.props.track}
                        currentCount={this.props.currentCount}
                        isPlaying={this.props.isPlaying}
                    />
                    <EditNoteModal
                        show={this.state.showModal}
                        turnShowOff={this.turnShowOff}
                        ins_type={this.props.instrument.ins_type}
                        chooseNotes={this.chooseNotes}
                        currentNote={this.state.currentNote}
                    />
                </div>
            </div>
        );
    }
}
