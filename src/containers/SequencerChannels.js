import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import Channel from "../components/Channel";

export default class SequencerChannels extends Component {
    renderChannels() {
        if (!this.props.instruments) return null;

        // this.props.instruments.sort((a, b) => (a.id > b.id ? 1 : -1));
        return this.props.instruments.map((ins) => {
            const track = this.props.tracks.find(
                (t) => t.instrument === ins.id
            );
            return (
                <Channel
                    key={ins.id}
                    instrument={ins}
                    setCurrentIns={this.props.setCurrentIns}
                    track={track}
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
