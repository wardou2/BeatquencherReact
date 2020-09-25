import React, { Component } from "react";
import { Form, Dropdown, Header, Divider } from "semantic-ui-react";

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

export default class MembranesynthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, field, { value }) {
        this.props.handleChangeInstrument(
            this.props.currentIns.id,
            field,
            value
        );
    }

    render() {
        return (
            <Form>
                <Divider />
                <Header as="h3">Oscillator </Header>
                <div className="form-width">
                    <Dropdown
                        placeholder="Oscillator Type"
                        fluid
                        value={this.props.currentIns.options.oscillator.type}
                        selection
                        options={oscTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(e, ["oscillator", "type"], {
                                value,
                            })
                        }
                    />
                    <br></br>
                    {this.props.currentIns.options.oscillator.type.slice(
                        0,
                        2
                    ) === "fm" ? (
                        <Form.Input
                            label={`Phase: ${this.props.currentIns.options.oscillator.phase} `}
                            fluid
                            min={0}
                            max={360}
                            name="phase"
                            onChange={(e, { value }) =>
                                this.handleChange(e, ["oscillator", "phase"], {
                                    value,
                                })
                            }
                            step={1}
                            type="range"
                            value={
                                this.props.currentIns.options.oscillator.phase
                            }
                        />
                    ) : null}
                </div>
                <Divider />

                <Header as="h3">Envelope</Header>
                <Form.Group widths="equal">
                    <Form.Input
                        label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
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
                        value={this.props.currentIns.options.envelope.attack}
                    />
                    <Form.Input
                        label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
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
                        value={this.props.currentIns.options.envelope.decay}
                    />
                    <Form.Input
                        label={`Sustain: ${this.props.currentIns.options.envelope.sustain} `}
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
                        value={this.props.currentIns.options.envelope.sustain}
                    />
                    <Form.Input
                        label={`Release: ${this.props.currentIns.options.envelope.release}s `}
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
                        value={this.props.currentIns.options.envelope.release}
                    />
                </Form.Group>
                <Divider />

                <Header as="h3">Effects</Header>
                <Form.Group widths="equal">
                    <Form.Input
                        label={`Filter Cutoff: ${this.props.getEffect([
                            "filter",
                            "frequency",
                        ])} Hz`}
                        fluid
                        min={1}
                        max={18000}
                        name="reverb"
                        onChange={(e, { value }) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["filter", "frequency"],
                                { value }
                            )
                        }
                        step={1}
                        type="range"
                        value={this.props.getEffect(["filter", "frequency"])}
                    />
                    <Form.Input
                        label={`Filter Q: ${this.props.getEffect([
                            "filter",
                            "Q",
                        ])}`}
                        fluid
                        min={0.01}
                        max={12}
                        name="reverb"
                        onChange={(e, { value }) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["filter", "Q"],
                                { value }
                            )
                        }
                        step={0.01}
                        type="range"
                        value={this.props.getEffect(["filter", "Q"])}
                    />
                    <Form.Input
                        label={`Distortion: ${this.props.getEffect([
                            "distortion",
                            "distortion",
                        ])}`}
                        fluid
                        min={0.01}
                        max={1}
                        name="distortion"
                        onChange={(e, { value }) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["distortion", "distortion"],
                                { value }
                            )
                        }
                        step={0.01}
                        type="range"
                        value={this.props.getEffect([
                            "distortion",
                            "distortion",
                        ])}
                    />
                </Form.Group>
            </Form>
        );
    }
}
