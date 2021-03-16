import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import ChannelSlider from "./ChannelSlider";
import { sine, square, triangle, sawtooth } from "../images";

const oscTypeOptions = [
    {
        key: "sine",
        text: "Sine Wave",
        value: "sine",
        image: { avatar: true, src: sine },
    },
    {
        key: "square",
        text: "Square Wave",
        value: "square",
        image: { avatar: true, src: square },
    },
    {
        key: "triangle",
        text: "Triangle Wave",
        value: "triangle",
        image: { avatar: true, src: triangle },
    },
    {
        key: "sawtooth",
        text: "Sawtooth Wave",
        value: "sawtooth",
        image: { avatar: true, src: sawtooth },
    },
    {
        key: "fmsine",
        text: "FM Sine Wave",
        value: "fmsine",
        image: { avatar: true, src: sine },
    },
    {
        key: "fmsquare",
        text: "FM Square Wave",
        value: "fmsquare",
        image: { avatar: true, src: square },
    },
    {
        key: "fmtriangle",
        text: "FM Triangle Wave",
        value: "fmtriangle",
        image: { avatar: true, src: triangle },
    },
    {
        key: "fmsawtooth",
        text: "FM Sawtooth Wave",
        value: "fmsawtooth",
        image: { avatar: true, src: sawtooth },
    },
];

export default class MonosynthForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(field, value) {
        this.props.handleChangeInstrument(
            this.props.currentIns.id,
            field,
            value
        );
    }

    render() {
        return (
            <div className="instrument-form">
                <div className="instrument-form--column">
                    <h3>Oscillator Source</h3>
                    <Dropdown
                        value={this.props.currentIns.options.oscillator.type}
                        fluid
                        selection
                        options={oscTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(["oscillator", "type"], value)
                        }
                    />
                </div>

                <div className="instrument-form--column">
                    <h3>Envelope</h3>
                    <ChannelSlider
                        label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
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
                        value={this.props.currentIns.options.envelope.attack}
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
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
                        value={this.props.currentIns.options.envelope.decay}
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Sustain: ${this.props.currentIns.options.envelope.sustain} `}
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
                        value={this.props.currentIns.options.envelope.sustain}
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Release: ${this.props.currentIns.options.envelope.release}s `}
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
                        value={this.props.currentIns.options.envelope.release}
                        classes="instrument-control-slider"
                    />
                </div>

                <div className="instrument-form--column">
                    <h3>Filter Envelope</h3>
                    <ChannelSlider
                        label={`Attack: ${this.props.currentIns.options.filterEnvelope.attack}s `}
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
                            this.props.currentIns.options.filterEnvelope.attack
                        }
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Decay: ${this.props.currentIns.options.filterEnvelope.decay}s `}
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
                            this.props.currentIns.options.filterEnvelope.decay
                        }
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Sustain: ${this.props.currentIns.options.filterEnvelope.sustain} `}
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
                            this.props.currentIns.options.filterEnvelope.sustain
                        }
                        classes="instrument-control-slider"
                    />
                    <ChannelSlider
                        label={`Release: ${this.props.currentIns.options.filterEnvelope.release}s `}
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
                            this.props.currentIns.options.filterEnvelope.release
                        }
                        classes="instrument-control-slider"
                    />
                </div>
            </div>
        );
    }
}
