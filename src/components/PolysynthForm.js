import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import ChannelSlider from "./ChannelSlider";

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
            currentIns: JSON.parse(JSON.stringify(this.props.currentIns)),
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field, value) {
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
            <div className="instrument-form">
                <div className="instrument-form--column">
                    <h3>Oscillator Source</h3>
                    <Dropdown
                        value={this.state.currentIns.options.oscillator.type}
                        fluid
                        selection
                        options={oscTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(["oscillator", "type"], value)
                        }
                    />

                    <h3>Envelope</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Attack: ${this.state.currentIns.options.envelope.attack}s `}
                        min={0.001}
                        max={3}
                        name="attack"
                        callback={(e) =>
                            this.handleChange(
                                ["envelope", "attack"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.attack}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Decay: ${this.state.currentIns.options.envelope.decay}s `}
                        min={0.001}
                        max={3}
                        name="decay"
                        callback={(e) =>
                            this.handleChange(
                                ["envelope", "decay"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.decay}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Sustain: ${this.state.currentIns.options.envelope.sustain} `}
                        min={0.001}
                        max={0.99}
                        name="sustain"
                        callback={(e) =>
                            this.handleChange(
                                ["envelope", "sustain"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.sustain}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Release: ${this.state.currentIns.options.envelope.release}s `}
                        min={0.001}
                        max={3}
                        name="release"
                        callback={(e) =>
                            this.handleChange(
                                ["envelope", "release"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={this.state.currentIns.options.envelope.release}
                    />
                </div>

                <div className="instrument-form--column">
                    <h3>Filter Envelope</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Base Frequency: ${this.state.currentIns.options.filterEnvelope.baseFrequency}Hz `}
                        min={0}
                        max={18000}
                        name="baseFrequency"
                        callback={(e) =>
                            this.handleChange(
                                ["filterEnvelope", "baseFrequency"],
                                e.target.value
                            )
                        }
                        step={1}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope
                                .baseFrequency
                        }
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Filter Q: ${this.state.currentIns.options.filter.Q} `}
                        min={0}
                        max={18}
                        name="Q"
                        callback={(e) =>
                            this.handleChange(["filter", "Q"], e.target.value)
                        }
                        step={0.1}
                        type="range"
                        value={this.state.currentIns.options.filter.Q}
                    />

                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Attack: ${this.state.currentIns.options.filterEnvelope.attack}s `}
                        min={0.001}
                        max={3}
                        name="attack"
                        callback={(e) =>
                            this.handleChange(
                                ["filterEnvelope", "attack"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.attack
                        }
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Decay: ${this.state.currentIns.options.filterEnvelope.decay}s `}
                        min={0.001}
                        max={3}
                        name="decay"
                        callback={(e) =>
                            this.handleChange(
                                ["filterEnvelope", "decay"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.decay
                        }
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Sustain: ${this.state.currentIns.options.filterEnvelope.sustain} `}
                        min={0.001}
                        max={0.99}
                        name="sustain"
                        callback={(e) =>
                            this.handleChange(
                                ["filterEnvelope", "sustain"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.sustain
                        }
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Release: ${this.state.currentIns.options.filterEnvelope.release}s `}
                        min={0.001}
                        max={3}
                        name="release"
                        callback={(e) =>
                            this.handleChange(
                                ["filterEnvelope", "release"],
                                e.target.value
                            )
                        }
                        step={0.001}
                        type="range"
                        value={
                            this.state.currentIns.options.filterEnvelope.release
                        }
                    />
                </div>
            </div>
        );
    }
}
