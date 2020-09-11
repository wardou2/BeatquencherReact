import React, { Component } from "react";
import { Button, Radio, Message, Grid, Divider } from "semantic-ui-react";

const notesList1 = [
    "B2",
    "A#2",
    "A2",
    "G#2",
    "G2",
    "F#2",
    "F2",
    "E2",
    "D#2",
    "D2",
    "C#2",
    "C2",
];
const notesList2 = [
    "B3",
    "A#3",
    "A3",
    "G#3",
    "G3",
    "F#3",
    "F3",
    "E3",
    "D#3",
    "D3",
    "C#3",
    "C3",
];
const notesList3 = [
    "B4",
    "A#4",
    "A4",
    "G#4",
    "G4",
    "F#4",
    "F4",
    "E4",
    "D#4",
    "D4",
    "C#4",
    "C4",
];

export default class PolyEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            active: true,
            showError: false,
            currentNote: "",
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentNote !== state.currentNote) {
            if (props.currentNote === "") {
                return {
                    notes: [],
                    currentNote: props.currentNote,
                };
            }
            return {
                notes: props.currentNote,
                currentNote: props.currentNote,
            };
        }
        return null;
    }

    handleClick = (note) => {
        let notesCopy = this.state.notes;
        if (notesCopy.length < 4 || notesCopy.includes(note)) {
            if (notesCopy.includes(note)) {
                notesCopy = notesCopy.filter((n) => n !== note);
            } else {
                notesCopy.push(note);
            }

            this.setState({
                notes: notesCopy,
                showError: false,
            });
        } else {
            this.setState({
                showError: true,
            });
        }
    };

    checkActive = (note) => {
        return this.state.notes.includes(note);
    };

    toggleActive = () => {
        this.setState({
            active: !this.state.active,
        });
    };

    renderButtons = (notesList) => {
        return notesList.map((note, i) => {
            return (
                <Button
                    key={i}
                    toggle
                    fluid
                    active={this.checkActive(note)}
                    onClick={() => this.handleClick(note)}
                    color={note[1] === "#" ? "black" : null}
                >
                    {note}
                </Button>
            );
        });
    };

    errorMessage = () => {
        return (
            <Message negative>
                <Message.Header>Only 4 notes allowed.</Message.Header>
            </Message>
        );
    };

    handleSubmit = () => {
        this.props.chooseNotes(this.state.notes, this.state.active);
    };

    render() {
        return (
            <div>
                {this.state.showError ? this.errorMessage() : null}
                <Grid centered>
                    <Grid.Column width={4}>
                        {this.renderButtons(notesList1)}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {this.renderButtons(notesList2)}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        {this.renderButtons(notesList3)}
                    </Grid.Column>
                </Grid>
                <Divider />
                <Radio
                    className="float-left"
                    label="Active"
                    toggle
                    checked={this.state.active}
                    onClick={this.toggleActive}
                />
                <Button type="submit" onClick={this.handleSubmit}>
                    Done
                </Button>
            </div>
        );
    }
}
