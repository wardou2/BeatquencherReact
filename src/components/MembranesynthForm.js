import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import ChannelSlider from "./ChannelSlider";

const oscTypeOptions = [
    {
        key: "sine",
        text: "Sine",
        value: "sine",
        image: { avatar: true, src: "/images/sine.jpg" },
    },
    {
        key: "square",
        text: "Square",
        value: "square",
        image: { avatar: true, src: "/images/square.jpg" },
    },
    {
        key: "triangle",
        text: "Triangle",
        value: "triangle",
        image: { avatar: true, src: "/images/triangle.jpg" },
    },
    {
        key: "sawtooth",
        text: "Sawtooth",
        value: "sawtooth",
        image: { avatar: true, src: "/images/sawtooth.jpg" },
    },
    {
        key: "fmsine",
        text: "FM Sine",
        value: "fmsine",
        image: { avatar: true, src: "/images/sine.jpg" },
    },
    {
        key: "fmsquare",
        text: "FM Square",
        value: "fmsquare",
        image: { avatar: true, src: "/images/square.jpg" },
    },
    {
        key: "fmtriangle",
        text: "FM Triangle",
        value: "fmtriangle",
        image: { avatar: true, src: "/images/triangle.jpg" },
    },
    {
        key: "fmsawtooth",
        text: "FM Sawtooth",
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
                    <h3>Oscillator </h3>
                    <Dropdown
                        placeholder="Oscillator Type"
                        value={this.props.currentIns.options.oscillator.type}
                        selection
                        options={oscTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(["oscillator", "type"], value)
                        }
                    />
                    <br></br>
                    <br></br>
                    {this.props.currentIns.options.oscillator.type.slice(
                        0,
                        2
                    ) === "fm" && (
                        <ChannelSlider
                            classes="instrument-control-slider"
                            label={`Phase: ${this.props.currentIns.options.oscillator.phase} `}
                            min={0}
                            max={360}
                            name="phase"
                            callback={(e) =>
                                this.handleChange(
                                    ["oscillator", "phase"],
                                    e.target.value
                                )
                            }
                            step={1}
                            value={
                                this.props.currentIns.options.oscillator.phase
                            }
                        />
                    )}
                </div>

                <div className="instrument-form--column">
                    <h3>Envelope</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                        value={this.props.currentIns.options.envelope.attack}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                        value={this.props.currentIns.options.envelope.decay}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                        value={this.props.currentIns.options.envelope.sustain}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                        value={this.props.currentIns.options.envelope.release}
                    />
                </div>

                <div className="instrument-form--column">
                    <h3>Effects</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Filter Cutoff: ${this.props.getEffect([
                            "filter",
                            "frequency",
                        ])} Hz`}
                        min={1}
                        max={18000}
                        name="reverb"
                        callback={(e) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["filter", "frequency"],
                                e.target.value
                            )
                        }
                        step={1}
                        value={this.props.getEffect(["filter", "frequency"])}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Filter Q: ${this.props.getEffect([
                            "filter",
                            "Q",
                        ])}`}
                        min={0.01}
                        max={12}
                        name="reverb"
                        callback={(e) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["filter", "Q"],
                                e.target.value
                            )
                        }
                        step={0.01}
                        value={this.props.getEffect(["filter", "Q"])}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Distortion: ${this.props.getEffect([
                            "distortion",
                            "distortion",
                        ])}`}
                        min={0.01}
                        max={1}
                        name="distortion"
                        callback={(e) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["distortion", "distortion"],
                                e.target.value
                            )
                        }
                        step={0.01}
                        value={this.props.getEffect([
                            "distortion",
                            "distortion",
                        ])}
                    />
                </div>
            </div>
        );
    }
}
