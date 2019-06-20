import _ from 'lodash'
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

const selectedShadow = 'inset 0px 0px 10px 5px rgba(253, 155, 255, .4)'
const unselectedShadow = 'inset 0px 0px 10px 5px rgba(0, 0, 0, .1)'
const nowPlayingShadow = 'inset 0px 0px 10px 5px #0ff, 0px 0px 10px 5px #f0f'

export default class Sequencer extends Component {

  constructor(props){
    super(props)
    this.state = {

    }
    this.columns = this.columns.bind(this)
  }

  isEmpty(obj) {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  divStyle = (t, i) => {

    if (this.props.isPlaying && this.props.currentCount%16 === i) {
      if (t !== [] && t) {
        return {'backgrounColor': 'indigo',
                'boxShadow': nowPlayingShadow,
                'zIndex': '-1'
                }
      } else {
        return {'backgrounColor': 'whiteSmoke',
                'boxShadow': nowPlayingShadow,
                'zIndex': '5'
                }
      }
    } else {
      if (t !== [] && t) {
        return {'backgroundColor': 'indigo',
                'boxShadow': selectedShadow
                }
      } else {
        return {'backgroundColor': 'whiteSmoke'}
      }
    }
  }

  columns() {
    if (!this.isEmpty(this.props.track)) {

      return this.props.track.notes.map((t, i) => {
        return <Grid.Column key={i} style={this.divStyle(t, i)} onClick={() => this.props.toggleCell(i, this.props.instrument)}>
                <span></span>
              </Grid.Column>
      })
    } else {
      return ''
    }
  }

  render(){
    return (
      <div>
        <Grid celled divided padded='vertically'>{this.columns()}</Grid>
      </div>
    )
  }
}
