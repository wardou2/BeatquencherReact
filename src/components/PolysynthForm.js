import React, { Component } from "react";

import ChannelSlider from "./ChannelSlider";
import OscillatorSource from "./OscillatorSource";

export default class PolysynthForm extends Component {
    constructor(props) {
        super();
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
                    <OscillatorSource
                        currentSelection={
                            this.props.currentIns.options.oscillator.type
                        }
                        handleChange={this.handleChange}
                    />
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
                        type="range"
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
                        type="range"
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
                        type="range"
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
                        type="range"
                        value={this.props.currentIns.options.envelope.release}
                    />
                </div>

                <div className="instrument-form--column">
                    <h3>Filter Envelope</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Base Frequency: ${this.props.currentIns.options.filterEnvelope.baseFrequency}Hz `}
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
                            this.props.currentIns.options.filterEnvelope
                                .baseFrequency
                        }
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Filter Q: ${this.props.currentIns.options.filter.Q} `}
                        min={0}
                        max={18}
                        name="Q"
                        callback={(e) =>
                            this.handleChange(["filter", "Q"], e.target.value)
                        }
                        step={0.1}
                        type="range"
                        value={this.props.currentIns.options.filter.Q}
                    />

                    <ChannelSlider
                        classes="instrument-control-slider"
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
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
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
                    />
                </div>
            </div>
        );
    }
}
