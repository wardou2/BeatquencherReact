import React, { Component } from "react";

import ChannelSlider from "./ChannelSlider";

export default class MetalsynthForm extends Component {
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
                    <h3>Oscillator</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Resonance: ${this.props.currentIns.options.resonance} Hz`}
                        min={1}
                        max={6000}
                        name="resonance"
                        callback={(e) =>
                            this.handleChange(["resonance"], e.target.value)
                        }
                        step={1}
                        value={this.props.currentIns.options.resonance}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Frequency: ${this.props.currentIns.options.frequency} Hz`}
                        min={1}
                        max={16000}
                        name="frequency"
                        callback={(e) =>
                            this.handleChange(["frequency"], e.target.value)
                        }
                        step={1}
                        value={this.props.currentIns.options.frequency}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Octaves: ${this.props.currentIns.options.octaves}`}
                        min={1}
                        max={12}
                        name="octaves"
                        callback={(e) =>
                            this.handleChange(["octaves"], e.target.value)
                        }
                        step={0.5}
                        value={this.props.currentIns.options.octaves}
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
                        value={this.props.currentIns.options.envelope.attack}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
                        min={0.002}
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
                        label={`Release: ${this.props.currentIns.options.envelope.release}s `}
                        min={0.001}
                        max={1}
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
            </div>
        );
    }
}
