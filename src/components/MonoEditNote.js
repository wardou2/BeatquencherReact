import React, { Component } from "react";
import { Button, Radio, Label, Icon } from "semantic-ui-react";

import Keyboard from "./Keyboard";

export default class MonoEditNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: props.currentNote,
            octave: 3,
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
                {this.state.showError && this.errorMessage()}
                <div style={{ textAlign: "center" }}>
                    {this.octaveButtons()}
                </div>
                <Keyboard
                    octave={this.state.octave}
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
