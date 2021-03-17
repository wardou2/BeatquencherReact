import React, { Component } from "react";
import { Dropdown } from "semantic-ui-react";

import ChannelSlider from "./ChannelSlider";

import "../styles/instrument-form.css";
import { brown, pink, white } from "../images";

const noiseTypeOptions = [
    {
        key: "white",
        text: "White",
        value: "white",
        image: { avatar: true, src: white },
    },
    {
        key: "brown",
        text: "Brown",
        value: "brown",
        image: { avatar: true, src: brown },
    },
    {
        key: "pink",
        text: "Pink",
        value: "pink",
        image: { avatar: true, src: pink },
    },
];

export default class NoisesynthForm extends Component {
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
                    <h3>Noise Type</h3>
                    <Dropdown
                        label="Noise Type"
                        value={this.props.currentIns.options.noise.type}
                        fluid
                        selection
                        options={noiseTypeOptions}
                        onChange={(e, { value }) =>
                            this.handleChange(["noise", "type"], value)
                        }
                    />
                </div>
                <div className="instrument-form--column">
                    <h3>Envelope</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        className="instrument-control-slider"
                        label={`Attack: ${this.props.currentIns.options.envelope.attack}s `}
                        min={0.001}
                        max={1}
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
                        className="instrument-control-slider"
                        label={`Decay: ${this.props.currentIns.options.envelope.decay}s `}
                        min={0.001}
                        max={1}
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
                        className="instrument-control-slider"
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
                </div>
                <div className="instrument-form--column">
                    <h3>Effects</h3>
                    <ChannelSlider
                        classes="instrument-control-slider"
                        className="instrument-control-slider"
                        label={`Reverb: ${
                            this.props.getEffect(["reverb", "wet"]) * 100
                        }%`}
                        min={0}
                        max={1}
                        name="reverb"
                        callback={(e) =>
                            this.props.handleChangeEffect(
                                this.props.currentIns.id,
                                ["reverb", "wet"],
                                e.target.value
                            )
                        }
                        step={0.01}
                        value={this.props.getEffect(["reverb", "wet"])}
                    />
                    <ChannelSlider
                        classes="instrument-control-slider"
                        className="instrument-control-slider"
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
                        className="instrument-control-slider"
                        label={`Filter Q: ${this.props.getEffect([
                            "filter",
                            "Q",
                        ])}`}
                        min={0.01}
                        max={20}
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
                </div>
            </div>
        );
    }
}
