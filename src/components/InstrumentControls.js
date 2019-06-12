import React, { Component } from 'react'
import MonosynthForm from './MonosynthForm'
import MembranesynthForm from './MembranesynthForm'

export default class InstrumentControls extends Component {

  constructor(props){
    super(props)
    this.state = {}
    this.renderControls = this.renderControls.bind(this)
  }

  renderControls() {
    switch(this.props.currentIns.ins_type) {
      case "monosynth":
        return <MonosynthForm
                  currentIns={this.props.currentIns} handleChangeInstrument={this.props.handleChangeInstrument}
                />
        break
      case "membranesynth":
        return <MembranesynthForm
                  currentIns={this.props.currentIns} handleChangeInstrument={this.props.handleChangeInstrument}
                />
      return(<div>

      </div>)
        break
    }
  }

  render(){
    return (
      <div>
        <h3>{this.props.currentIns.ins_type}</h3>
        {this.renderControls()}
      </div>
    )
  }
}
