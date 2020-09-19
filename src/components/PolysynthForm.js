import React, { Component } from "react";
import { Form, Dropdown, Divider, Header } from "semantic-ui-react";

const oscTypeOptions = [
    {
        key: "sine",
        text: "Sine Wave",
        value: "sine",
        image: { avatar: true, src: "/images/sine.jpg" },
    },
    {
        key: "square",
        text: "Square Wave",
        value: "square",
        image: { avatar: true, src: "/images/square.jpg" },
    },
    {
        key: "triangle",
        text: "Triangle Wave",
        value: "triangle",
        image: { avatar: true, src: "/images/triangle.jpg" },
    },
    {
        key: "sawtooth",
        text: "Sawtooth Wave",
        value: "sawtooth",
        image: { avatar: true, src: "/images/sawtooth.jpg" },
    },
    {
        key: "fmsine",
        text: "FM Sine Wave",
        value: "fmsine",
        image: { avatar: true, src: "/images/sine.jpg" },
    },
    {
        key: "fmsquare",
        text: "FM Square Wave",
        value: "fmsquare",
        image: { avatar: true, src: "/images/square.jpg" },
    },
    {
        key: "fmtriangle",
        text: "FM Triangle Wave",
        value: "fmtriangle",
        image: { avatar: true, src: "/images/triangle.jpg" },
    },
    {
        key: "fmsawtooth",
        text: "FM Sawtooth Wave",
        value: "fmsawtooth",
        image: { avatar: true, src: "/images/sawtooth.jpg" },
    },
];

export default class PolysynthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIns: this.props.currentIns,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(_e, field, { value }) {
        // TODO: What was this for?
        // const val = field[1] && field[1] === "type" ? value : parseFloat(value);
        const insCopy = { ...this.state.currentIns };

        if (field[1]) {
            insCopy.options[field[0]][field[1]] = value;
        } else {
            insCopy.options[field[0]] = value;
        }

        this.setState(
            {
                currentIns: insCopy,
            },
            () =>
                this.props.handleChangeInstrument(
                    this.state.currentIns.id,
                    field,
                    value
                )
        );
    }

    render() {
        return (
            <Form>
                <div className="dropdown-div">
                    <Dropdown
                        value={this.state.currentIns.options.oscillator.type}
                        fluid
                        selection
                        options={oscTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["oscillator", "type"], {
                                value,
                            })
                        }
                    />
                </div>
                <Divider />
                <Header as="h3">Envelope</Header>
                <Form.Group widths="equal">
                    <Form.Input
                        label={`Attack: ${this.state.currentIns.options.envelope.attack}s `}
                        min={0.001}
                        max={3}
                        name="attack"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["envelope", "attack"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.attack}
                    />
                    <Form.Input
                        label={`Decay: ${this.state.currentIns.options.envelope.decay}s `}
                        min={0.001}
                        max={3}
                        name="decay"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["envelope", "decay"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.decay}
                    />
                    <Form.Input
                        label={`Sustain: ${this.state.currentIns.options.envelope.sustain} `}
                        min={0.001}
                        max={0.99}
                        name="sustain"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["envelope", "sustain"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.sustain}
                    />
                    <Form.Input
                        label={`Release: ${this.state.currentIns.options.envelope.release}s `}
                        min={0.001}
                        max={3}
                        name="release"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["envelope", "release"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.release}
                    />
                </Form.Group>
                <Divider />

                <div style={{ display: "inline-block", width: "50%" }}>
                    <Header as="h3">Filter Envelope</Header>
                    <Form.Group widths="equal">
                        <Form.Input
                            label={`Base Frequency: ${this.state.currentIns.options.filterEnvelope.baseFrequency}Hz `}
                            min={0}
                            max={18000}
                            name="baseFrequency"
                            onChange={(e, { value }) =>
                                this.handleChange(
                                    e,
                                    ["filterEnvelope", "baseFrequency"],
                                    { value }
                                )
                            }
                            step={1}
                            type="range"
                            value={
                                this.state.currentIns.options.filterEnvelope
                                    .baseFrequency
                            }
                        />
                        <Form.Input
                            label={`Filter Q: ${this.state.currentIns.options.filter.Q} `}
                            min={0}
                            max={18}
                            name="Q"
                            onChange={(e, { value }) =>
                                this.handleChange(e, ["filter", "Q"], { value })
                            }
                            step={0.1}
                            type="range"
                            value={this.state.currentIns.options.filter.Q}
                        />
                    </Form.Group>
                </div>

                <Form.Group widths="equal">
                    <Form.Input
                        label={`Attack: ${this.state.currentIns.options.filterEnvelope.attack}s `}
                        min={0.001}
                        max={3}
                        name="attack"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["filterEnvelope", "attack"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.attack
                        }
                    />
                    <Form.Input
                        label={`Decay: ${this.state.currentIns.options.filterEnvelope.decay}s `}
                        min={0.001}
                        max={3}
                        name="decay"
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["filterEnvelope", "decay"], {
                                value,
                            })
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.decay
                        }
                    />
                    <Form.Input
                        label={`Sustain: ${this.state.currentIns.options.filterEnvelope.sustain} `}
                        min={0.001}
                        max={0.99}
                        name="sustain"
                        onChange={(e, { value }) =>
                            this.handleChange(
                                e,
                                ["filterEnvelope", "sustain"],
                                { value }
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.sustain
                        }
                    />
                    <Form.Input
                        label={`Release: ${this.state.currentIns.options.filterEnvelope.release}s `}
                        min={0.001}
                        max={3}
                        name="release"
                        onChange={(e, { value }) =>
                            this.handleChange(
                                e,
                                ["filterEnvelope", "release"],
                                { value }
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.release
                        }
                    />
                </Form.Group>
            </Form>
        );
    }
}
