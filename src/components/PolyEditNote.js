import React, { Component } from "react";
import { Button, Radio, Message, Icon, Label } from "semantic-ui-react";

import Keyboard from "./Keyboard";

export default class PolyEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.currentNote || [],
            active: true,
            showError: false,
            octave: this.getOctave(props.currentNote),
        };
    }

    getOctave = (notes) => {
        if (notes) {
            const octaves = notes.map((note) => parseInt(note.slice(-1), 10));
            return Math.min(...octaves);
        }
        return 3;
    };

    handleClick = (note) => {
        let notesCopy = [...this.state.notes];
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

    toggleActive = () => {
        this.setState({
            active: !this.state.active,
        });
    };

    errorMessage = () => {
        return (
            <div>
                <Message negative compact>
                    <Message.Header>Only 4 notes allowed.</Message.Header>
                </Message>
            </div>
        );
    };

    handleSubmit = () => {
        this.props.chooseNotes(this.state.notes, this.state.active);
    };

    octaveButtons = () => {
        return (
            <Label size="medium">
                Octaves:
                <Label.Detail as="a">
                    <Icon
                        name="arrow left"
                        onClick={() => this.changeOctave({ up: false })}
                    />
                </Label.Detail>
                <Label.Detail>
                    {this.state.octave}-{this.state.octave + 1}
                </Label.Detail>
                <Label.Detail as="a">
                    <Icon
                        name="arrow right"
                        onClick={() => this.changeOctave({ up: true })}
                    />
                </Label.Detail>
            </Label>
        );
    };

    changeOctave = ({ up }) => {
        if (up) {
            if (this.state.octave === 5) return;

            this.setState((prevState) => ({
                ...prevState,
                octave: prevState.octave + 1,
            }));
            return;
        }
        if (this.state.octave === 0) return;

        this.setState((prevState) => ({
            ...prevState,
            octave: prevState.octave - 1,
        }));
    };

    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    {this.state.showError && this.errorMessage()}
                    {this.octaveButtons()}
                </div>
                <Keyboard
                    octave={this.state.octave}
                    activeNotes={this.state.notes}
                    handleClick={this.handleClick}
                />
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
