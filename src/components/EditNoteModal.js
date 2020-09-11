import React, { Component } from "react";
import { Modal } from "semantic-ui-react";
import MonoEditNote from "./MonoEditNote";
import PolyEditNote from "./PolyEditNote";

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

    handleChange = (e, value, name) => {
        this.setState({
            [name]: value,
        });
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
                        {this.props.ins_type === "monosynth" ? (
                            <MonoEditNote
                                currentNote={this.props.currentNote}
                                chooseNotes={this.props.chooseNotes}
                            />
                        ) : (
                            <PolyEditNote
                                currentNote={this.props.currentNote}
                                chooseNotes={this.props.chooseNotes}
                            />
                        )}
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditNoteModal;
