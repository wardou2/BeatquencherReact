import _ from 'lodash'
import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

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

  columns() {
    if (!this.isEmpty(this.props.track)) {

      return this.props.track.notes.map((t, i) => {
        let color = 'olive'
        if (t==='1') {
          color='red'
        }
        return <Grid.Column key={i} color={color} onClick={() => this.props.toggleCell(i)}>
              <span></span>
            </Grid.Column>
      })
    } else {
      return ''
    }
    // return _.times(16, i => (
    //     <Grid.Column key={i} color='olive' onClick={() => this.handleClick(i)}>
    //       <span>x</span>
    //     </Grid.Column>
    //   )
    // )
  }

  render(){
    return (
      <div>
        <Grid divided padded='vertically'>{this.columns()}</Grid>
      </div>
    )
  }
}
