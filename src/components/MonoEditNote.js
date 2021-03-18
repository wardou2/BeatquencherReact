import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import KeyboardContinuous from "./KeyboardContinuous";

export default class MonoEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: [props.currentNote] || [""],
            noteOld: [props.currentNote],
        };
    }

    handleClick = (note) => {
        this.setState((prev) => ({
            note: prev.note[0] === note ? [""] : [note],
        }));
    };

    handleSubmit = () => {
        this.props.chooseNotes(this.state.note[0], true);
    };

    render() {
        return (
            <div>
                <KeyboardContinuous
                    activeNotes={this.state.note}
                    handleClick={this.handleClick}
                />
                <Button
                    onClick={() => {
                        this.props.chooseNotes(this.state.noteOld[0], true);
                    }}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    onClick={() => {
                        this.props.chooseNotes(this.state.note[0], true);
                    }}
                >
                    Done
                </Button>
            </div>
        );
    }
}
