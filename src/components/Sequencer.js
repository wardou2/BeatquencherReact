import React, { Component } from "react";
import { Grid } from "semantic-ui-react";

const selectedShadow = "inset 0px 0px 10px 5px rgba(253, 155, 255, .4)";
// const unselectedShadow = "inset 0px 0px 10px 5px rgba(0, 0, 0, .1)";
const nowPlayingShadow = "inset 0px 0px 10px 5px #0ff, 0px 0px 10px 5px #f0f";

export default class Sequencer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.columns = this.columns.bind(this);
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    divStyle = (t, i) => {
        if (this.props.isPlaying && this.props.currentCount % 16 === i) {
            if (t !== [] && t) {
                return "sequencer-cell--active sequencer-cell--playing";
            }
            return "sequencer-cell--inactive sequencer-cell--playing";
        }
        if (t !== [] && t) {
            return "sequencer-cell--active";
        }
        return "sequencer-cell--inactive";
    };

    columns() {
        if (!this.isEmpty(this.props.track)) {
            return this.props.track.notes.map((t, i) => {
                return (
                    <Grid.Column
                        key={i}
                        className={this.divStyle(t, i)}
                        onClick={() =>
                            this.props.toggleCell(i, this.props.instrument)
                        }
                    ></Grid.Column>
                );
            });
        }
        return "";
    }

    render() {
        return (
            <div>
                <Grid celled divided padded="vertically">
                    {this.columns()}
                </Grid>
            </div>
        );
    }
}
