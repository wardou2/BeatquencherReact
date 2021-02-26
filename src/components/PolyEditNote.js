import React, { Component } from "react";
import { Button, Radio, Message } from "semantic-ui-react";

import KeyboardContinuous from "./KeyboardContinuous";

export default class PolyEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.currentNote || [],
            active: true,
            showError: false,
        };
    }

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

    render() {
        return (
            <div>
                <div style={{ textAlign: "center" }}>
                    {this.state.showError && this.errorMessage()}
                </div>
                <KeyboardContinuous
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
