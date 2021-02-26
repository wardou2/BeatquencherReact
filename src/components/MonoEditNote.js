import React, { Component } from "react";
import { Button, Radio } from "semantic-ui-react";

import KeyboardContinuous from "./KeyboardContinuous";

export default class MonoEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: props.currentNote || "",
            active: true,
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
        this.props.chooseNotes(this.state.note, this.state.active);
    };

    toggleActive = () => {
        this.setState({
            active: !this.state.active,
        });
    };

    render() {
        return (
            <div>
                {this.state.showError && this.errorMessage()}
                <KeyboardContinuous
                    activeNotes={[this.state.note]}
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
