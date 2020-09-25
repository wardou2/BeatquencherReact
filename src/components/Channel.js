import React, { Component } from "react";
import { Form, Grid, Button } from "semantic-ui-react";
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
            <Grid.Row
                divided={true}
                className={this.isSelected()}
                onClick={() => this.props.setCurrentIns(this.props.instrument)}
            >
                <Grid.Column width={2}>
                    <div className="channel-cell--name">
                        <h4>{this.props.instrument.name}</h4>
                        <div
                            onClick={() =>
                                this.props.handleMute(this.props.instrument.id)
                            }
                            className={
                                this.props.instrument.options.mute
                                    ? "channel-button--mute channel-button--mute--active"
                                    : "channel-button--mute"
                            }
                        >
                            M
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={2}>
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
                </Grid.Column>
                <Grid.Column width={12} verticalAlign="middle">
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
                </Grid.Column>
            </Grid.Row>
        );
    }
}
