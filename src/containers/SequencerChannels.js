import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Channel from "../components/Channel";

export default class SequencerChannels extends Component {
    renderChannels() {
        if (!this.props.instruments) return null;

        this.props.instruments.sort((a, b) => (a.id > b.id ? 1 : -1));
        return this.props.instruments.map((ins) => {
            return (
                <Channel
                    key={ins.id}
                    instrument={ins}
                    currentScene={this.props.currentScene}
                    tracks={this.props.tracks}
                    setCurrentIns={this.props.setCurrentIns}
                    updateTrack={this.props.updateTrack}
                    handleChangeInstrument={this.props.handleChangeInstrument}
                    handleMute={this.props.handleMute}
                    currentIns={this.props.currentIns}
                    isPlaying={this.props.isPlaying}
                    currentCount={this.props.currentCount}
                />
            );
        });
    }

    render() {
        return (
            <div className="sequencer-div">
                <Grid columns={16} stretched divided="vertically" celled={true}>
                    {this.renderChannels()}
                </Grid>
            </div>
        );
    }
}
