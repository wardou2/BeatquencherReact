import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

import RoutedButton from "./RoutedButton";
import { deleteProject } from "../api/Project";

class EditNoteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: true,
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.show !== state.open) {
            return {
                open: props.show,
            };
        }
        return null;
    }

    state = { open: false };

    show = (dimmer) => () => this.setState({ dimmer, open: true });

    close = () => {
        this.setState({ open: false });
        this.props.turnShowOff();
    };

    handleDelete = () => {
        deleteProject({ id: this.props.currentProj.id }).then(() =>
            this.props.projectWasDeleted()
        );
    };

    render() {
        const { open } = this.state;
        return (
            <div>
                <Modal
                    dimmer="blurring"
                    size="mini"
                    open={open}
                    onClose={this.close}
                >
                    <Modal.Header>Note Selector</Modal.Header>
                    <Modal.Actions>
                        <p>Are you sure you want to delete this project?</p>
                        <Button.Group>
                            <Button onClick={this.close}>Cancel</Button>
                            <Button.Or />
                            <RoutedButton
                                negative
                                text="Delete"
                                callback={this.handleDelete}
                                path="/projects"
                            />
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditNoteModal;
