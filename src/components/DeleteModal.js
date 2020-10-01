import React, { Component } from "react";
import { Modal, Button } from "semantic-ui-react";

class DeleteModal extends Component {
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

    show = (dimmer) => () => this.setState({ dimmer, open: true });

    close = () => {
        this.setState({ open: false });
        this.props.turnShowOff();
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
                    <Modal.Header>{this.props.header}</Modal.Header>
                    <Modal.Actions>
                        <p>{this.props.description}</p>
                        <Button.Group>
                            <Button onClick={this.close}>Cancel</Button>
                            <Button.Or />
                            {this.props.route}
                        </Button.Group>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default DeleteModal;
