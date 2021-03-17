import React, { Component } from "react";
import { Form, Button, Icon, Header, List } from "semantic-ui-react";

import DeleteProjectModal from "../components/DeleteProjectModal";
import DeleteSceneModal from "../components/DeleteSceneModal";
import StyledButton from "../components/StyledButton";

import "../styles/selector.css";

export default class SceneSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formType: "",
            name: "",
            title: "",
            editing: false,
            showModal: {
                project: false,
                scene: false,
            },
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

    toggleShowModal = (selector) => {
        const showModalCopy = { ...this.state.showModal };
        showModalCopy[selector] = !showModalCopy[selector];
        this.setState({
            showModal: showModalCopy,
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
                    <h3>Edit Project</h3>
                    <Form.Input
                        label="Title"
                        placeholder="Title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                    />
                    <input type="submit" style={{ display: "none" }} />
                    <Button
                        negative
                        onClick={() => this.toggleShowModal("project")}
                    >
                        Delete Project
                    </Button>

                    <Button type="submit">Submit Title</Button>
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
                    <h3>Rename Scene</h3>
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
                <div className="scene-form-button-wrapper">
                    <StyledButton
                        callback={() =>
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
                        fluid
                    >
                        Add New Scene
                    </StyledButton>
                </div>
                <div className="scene-form-button-wrapper">
                    <StyledButton
                        callback={() => this.setState({ formType: "proj" })}
                        disabled={!this.props.loggedIn}
                        fluid
                    >
                        Edit Project
                    </StyledButton>
                </div>
            </div>
        );
    }

    renderScenes() {
        // TODO: Styles on list... Pretty hacky
        const sortedScenes = [].concat(this.props.currentProj.scenes);
        sortedScenes.sort((a, b) => (a.id > b.id ? 1 : -1));
        return (
            <div className="scene-list-scrollable">
                <List animated divided selection relaxed="very">
                    {sortedScenes.map((scene) => {
                        return (
                            <List.Item key={scene.id}>
                                {this.props.loggedIn && (
                                    <>
                                        <List.Content floated="right">
                                            <List.Icon
                                                name="delete"
                                                link
                                                onClick={() =>
                                                    this.setState({
                                                        showModal: {
                                                            ...this.state
                                                                .showModal,
                                                            scene: true,
                                                        },
                                                        scene,
                                                    })
                                                }
                                            />
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
                                            <List.Icon
                                                name="edit"
                                                link
                                                aria-label="Edit"
                                            />
                                        </List.Content>
                                        <List.Content
                                            floated="left"
                                            style={{ opacity: "0%" }}
                                            onClick={() =>
                                                this.handleClick(scene)
                                            }
                                        >
                                            <List.Icon name="delete" />
                                        </List.Content>
                                        <List.Content
                                            floated="left"
                                            style={{ opacity: "0%" }}
                                            onClick={() =>
                                                this.handleClick(scene)
                                            }
                                        >
                                            <List.Icon name="edit" />
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
            </div>
        );
    }

    render() {
        return (
            <div className="scene-selector">
                {this.state.showModal.project && (
                    <DeleteProjectModal
                        turnShowOff={() => this.toggleShowModal("project")}
                        currentProj={this.props.currentProj}
                        projectWasDeleted={this.props.projectWasDeleted}
                    />
                )}
                {this.state.showModal.scene && (
                    <DeleteSceneModal
                        turnShowOff={() => this.toggleShowModal("scene")}
                        scene={this.state.scene}
                        sceneWasDeleted={() =>
                            this.props.sceneWasDeleted(this.state.scene.id)
                        }
                    />
                )}
                <div className="scene-list-container">
                    <h2>Select Scene</h2>
                    {this.renderScenes()}
                </div>
                <div className="scene-form-container">{this.form()}</div>
            </div>
        );
    }
}
