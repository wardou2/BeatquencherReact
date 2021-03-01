import React, { Component } from "react";
import { Button } from "semantic-ui-react";

import KeyboardContinuous from "./KeyboardContinuous";

export default class MonoEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: props.currentNote || "",
        };
    }

    handleClick = (note) => {
        if (this.state.note === note) {
            this.setState({
                note: "",
            });
        } else {
            this.setState({
                note,
            });
        }
    };

    handleSubmit = () => {
        this.props.chooseNotes(this.state.note, true);
    };

    render() {
        return (
            <div>
                <KeyboardContinuous
                    activeNotes={[this.state.note]}
                    handleClick={this.handleClick}
                />
                <Button type="submit" onClick={this.handleSubmit}>
                    Done
                </Button>
            </div>
        );
    }
}
