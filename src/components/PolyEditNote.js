import React, { Component } from "react";
import { Button, Message, Confirm } from "semantic-ui-react";

import KeyboardContinuous from "./KeyboardContinuous";

export default class PolyEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: props.currentNote || [],
            showError: false,
            open: false,
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
                <Message
                    negative
                    onDismiss={() => this.setState({ showError: false })}
                >
                    <Message.Header>Only 4 notes allowed.</Message.Header>
                </Message>
            </div>
        );
    };

    showModal = () => {
        this.setState({ open: true });
    };

    hideModal = () => {
        this.setState({ open: false });
    };

    handleClear = () => {
        this.setState({ open: false, notes: [] }, () =>
            this.props.chooseNotes(this.state.notes, false)
        );
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
                <Button className="float-left" onClick={this.showModal}>
                    Clear Notes
                </Button>
                <Button
                    type="submit"
                    onClick={() =>
                        this.props.chooseNotes(this.state.notes, true)
                    }
                >
                    Done
                </Button>
                <Confirm
                    open={this.state.open}
                    onCancel={this.hideModal}
                    onConfirm={this.handleClear}
                    content="Are you sure you want to clear notes?"
                    size="mini"
                />
            </div>
        );
    }
}
