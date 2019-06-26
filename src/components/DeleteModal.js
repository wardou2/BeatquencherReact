import React, { Component } from 'react'
import MonoEditNote from './MonoEditNote'
import PolyEditNote from './PolyEditNote'
import { BrowserRouter as Router, Route, Redirect, withRouter } from 'react-router-dom';
import Cookies from 'js-cookie'

import { Header, Image, Modal, Form, Dropdown, Button, Radio, Segment } from 'semantic-ui-react'

class EditNoteModal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      active: true
    }
  }

  static getDerivedStateFromProps(props, state) {
    if (props.show !== state.open) {
      return {
        open: props.show
      }
    } else {
      return null
    }
  }

 state = { open: false }

 show = dimmer => () => this.setState({ dimmer, open: true })

 close = () => {
   this.setState({ open: false })
   this.props.turnShowOff()
 }

 handleDelete = () => {
   fetch('https://evening-brook-20328.herokuapp.com/api/v1/projects/'+this.props.currentProj.id, {
     method: 'DELETE',
     headers: {
       'id_token': Cookies.get('id_token'),
       'Content-Type': 'application/json'
     }
   })

   this.props.projectWasDeleted('projectSelector')
   // this.close()
 }

 render() {
   const { open} = this.state
   return (
     <div>
       <Modal dimmer='blurring' size='mini' open={open} onClose={this.close}>
         <Modal.Header>Note Selector</Modal.Header>
         <Modal.Actions>
            <p>Are you sure you want to delete this project?</p>
            <Button.Group>
              <Button onClick={this.close}>Cancel</Button>
              <Button.Or />
              <Button negative onClick={this.handleDelete}>Delete</Button>
            </Button.Group>
         </Modal.Actions>
       </Modal>
     </div>
   )
 }
}

export default EditNoteModal
