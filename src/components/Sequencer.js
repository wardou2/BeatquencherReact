import _ from 'lodash'
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

const blurVals = 'inset 0px 0px 10px 5px #0ff, 0px 0px 10px 5px #f0f'

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
      if (t) {
        return {'backgrounColor': 'darkViolet',
                'boxShadow': blurVals
                }
      } else {
        return {'backgrounColor': 'lightGrey',
                'boxShadow': blurVals
                }
      }
    } else {
      if (t) {
        return {'backgroundColor': 'darkViolet'}
      } else {
        return {'backgroundColor': 'lightGrey'}
      }
    }
  }

  columns() {
    if (!this.isEmpty(this.props.track)) {

      return this.props.track.notes.map((t, i) => {
        return <Grid.Column key={i} style={this.divStyle(t, i)} onClick={() => this.props.toggleCell(i)}>
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
        <Grid divided padded='vertically'>{this.columns()}</Grid>
      </div>
    )
  }
}
