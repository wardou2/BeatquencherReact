import React, { Component } from "react";
import { Form, Button, Icon, Header, List, Segment } from "semantic-ui-react";

import DeleteModal from "../components/DeleteModal";

export default class SceneSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: "",
            name: "",
            title: "",
            editing: false,
            showModal: false,
            scene: null,
        };
        this.renderScenes = this.renderScenes.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.form = this.form.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentProj.title !== state.title && !state.editing) {
            return {
                title: props.currentProj.title,
                editing: true,
            };
        }
        return null;
    }

    handleClick(scene) {
        this.props.setCurrentScene(scene);
    }

    showForm(type) {
        this.setState({
            formType: type,
            name: `Scene ${(this.props.currentProj.scenes.length + 10)
                .toString(36)
                .toUpperCase()}`,
        });
    }

    hideForm() {
        this.setState({
            editing: false,
            formType: "",
        });
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value });
    };

    handleSubmitScene = () => {
        this.props.newScene({ name: this.state.name });
        this.hideForm();
    };

    handleSubmitProj = () => {
        this.props.handleChangeProj("title", this.state.title, true);
        this.hideForm();
    };

    handleRenameScene = () => {
        this.props.renameScene(this.state.scene.id, this.state.name);
        this.hideForm();
    };

    showDeleteModal = () => {
        this.setState({
            showModal: true,
        });
    };

    turnShowOff = () => {
        this.setState({
            showModal: false,
        });
    };

    form() {
        if (this.state.formType === "newScene") {
            return (
                <Form onSubmit={this.handleSubmitScene}>
                    <div className="fake-close-btn">
                        <Icon name="close" />
                    </div>
                    <div className="close-btn">
                        <Icon name="close" onClick={this.hideForm} />
                    </div>
                    <Header as="h2">New Scene</Header>
                    <Form.Input
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            );
        }
        if (this.state.formType === "proj") {
            return (
                <Form onSubmit={this.handleSubmitProj}>
                    <div className="fake-close-btn">
                        <Icon name="close" />
                    </div>
                    <div className="close-btn">
                        <Icon name="close" onClick={this.hideForm} />
                    </div>
                    <Header as="h2">Edit Project</Header>
                    <Form.Input
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <Button type="submit">Submit</Button>
                    <Button negative onClick={this.showDeleteModal}>
                        Delete Project
                    </Button>
                </Form>
            );
        }
        if (this.state.formType === "renameScene") {
            return (
                <Form onSubmit={() => this.handleRenameScene()}>
                    <div className="fake-close-btn">
                        <Icon name="close" />
                    </div>
                    <div className="close-btn">
                        <Icon name="close" onClick={this.hideForm} />
                    </div>
                    <Header as="h2">Rename Scene</Header>
                    <Form.Input
                        label="Name"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Button type="submit">Submit</Button>
                </Form>
            );
        }
        return (
            <div>
                <Button
                    fluid
                    onClick={() =>
                        this.setState({
                            formType: "newScene",
                            name: `Scene ${(
                                this.props.currentProj.scenes.length + 10
                            )
                                .toString(36)
                                .toUpperCase()}`,
                        })
                    }
                    style={{ marginBottom: "8px" }}
                    disabled={!this.props.loggedIn}
                >
                    Add New Scene
                </Button>
                <Button
                    fluid
                    onClick={() => this.setState({ formType: "proj" })}
                    disabled={!this.props.loggedIn}
                >
                    Edit Project
                </Button>
            </div>
        );
    }

    renderScenes() {
        const sortedScenes = [].concat(this.props.currentProj.scenes);
        sortedScenes.sort((a, b) => (a.id > b.id ? 1 : -1));
        return (
            <List divided selection verticalAlign="middle">
                {sortedScenes.map((scene) => {
                    return (
                        <List.Item key={scene.id}>
                            {this.props.loggedIn && (
                                <>
                                    <List.Content
                                        floated="left"
                                        style={{ opacity: "0%" }}
                                    >
                                        <List.Icon name="edit" link />
                                    </List.Content>
                                    <List.Content
                                        floated="right"
                                        onClick={() => {
                                            this.setState({
                                                scene,
                                                name: scene.name,
                                                formType: "renameScene",
                                            });
                                        }}
                                    >
                                        <List.Icon name="edit" link />
                                    </List.Content>
                                </>
                            )}
                            <List.Content as="a">
                                <List.Header
                                    onClick={() => this.handleClick(scene)}
                                >
                                    {scene.name}
                                </List.Header>
                            </List.Content>
                        </List.Item>
                    );
                })}
            </List>
        );
    }

    render() {
        return (
            <div className="projects-list">
                <br></br>
                <DeleteModal
                    show={this.state.showModal}
                    turnShowOff={this.turnShowOff}
                    currentProj={this.props.currentProj}
                    projectWasDeleted={this.props.projectWasDeleted}
                />
                <Segment>
                    <Header as="h2">Select Scene</Header>
                    {this.renderScenes()}
                </Segment>
                <Segment>{this.form()}</Segment>
            </div>
        );
    }
}
