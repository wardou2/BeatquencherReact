import React, { Component } from "react";
import { Header } from "semantic-ui-react";
import MonosynthForm from "./MonosynthForm";
import PolysynthForm from "./PolysynthForm";
import MembranesynthForm from "./MembranesynthForm";
import MetalsynthForm from "./MetalsynthForm";
import NoisesynthForm from "./NoisesynthForm";

export default class InstrumentControls extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderControls = this.renderControls.bind(this);
        this.getEffect = this.getEffect.bind(this);
    }

    getEffect(vals) {
        const eff = this.props.currentIns.effects.filter(
            (e) => e.eff_type === vals[0]
        )[0];
        return eff.eff_options[vals[1]];
    }

    renderControls() {
        switch (this.props.currentIns.ins_type) {
            case "monosynth":
                return (
                    <MonosynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                    />
                );
            case "polysynth":
                return (
                    <PolysynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                    />
                );
            case "bass_drum":
                return (
                    <MembranesynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                        handleChangeEffect={this.props.handleChangeEffect}
                        getEffect={this.getEffect}
                    />
                );
            case "open_hihat":
                return (
                    <MetalsynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                        getEffect={this.getEffect}
                    />
                );
            case "closed_hihat":
                return (
                    <MetalsynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                        getEffect={this.getEffect}
                    />
                );
            case "snare":
                return (
                    <NoisesynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                        handleChangeEffect={this.props.handleChangeEffect}
                        getEffect={this.getEffect}
                    />
                );
            default:
                return (
                    <MonosynthForm
                        currentIns={this.props.currentIns}
                        handleChangeInstrument={
                            this.props.handleChangeInstrument
                        }
                    />
                );
        }
    }

    render() {
        return (
            <div className="ins-control-div glow">
                <Header as="h2">{this.props.currentIns.name}</Header>
                {this.renderControls()}
            </div>
        );
    }
}
