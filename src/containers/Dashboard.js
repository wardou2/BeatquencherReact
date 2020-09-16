import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Tone from "tone";
import { Container } from "semantic-ui-react";
import Cookies from "js-cookie";

import Navbar from "../components/Navbar";
import ProjectsList from "./ProjectsList";
import SceneSelector from "./SceneSelector";
import ProjectView from "./ProjectView";
import NewProjectForm from "../components/NewProjectForm";
import BASE_URL from "../api_url";
import Landing from "../components/Landing";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProj: {},
            currentScene: {},
        };
        this.isEmpty = this.isEmpty.bind(this);
        this.setCurrentProj = this.setCurrentProj.bind(this);
        this.setCurrentScene = this.setCurrentScene.bind(this);
        this.handleChangeProject = this.handleChangeProject.bind(this);
        this.startNewProject = this.startNewProject.bind(this);
        this.newProject = this.newProject.bind(this);
        this.newScene = this.newScene.bind(this);
        this.handleChangeScene = this.handleChangeScene.bind(this);
        this.projectWasDeleted = this.projectWasDeleted.bind(this);
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    startNewProject() {}

    newProject(vals) {
        fetch(`${BASE_URL}init`, {
            method: "POST",
            headers: {
                id_token: Cookies.get("id_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                project: {
                    title: vals.name,
                    tempo: vals.tempo,
                    user_id: this.props.currentUser.id,
                    scene_count: vals.scenes,
                },
            }),
        })
            .then((res) => res.json())
            .catch((error) => new Error("Error", error))
            .then((json) => this.setCurrentProj(json));
    }

    projectWasDeleted(path) {
        this.setState({
            currentProj: {},
        });
    }

    setCurrentProj(proj) {
        this.setState({
            currentProj: proj,
        });
    }

    setCurrentScene(scene) {
        Tone.Transport.cancel();
        this.setState({
            currentScene: scene,
        });
        this.props.history.push(
            `/projects/${this.state.currentProj.id}/${this.state.currentScene.id}`
        );
    }

    handleChangeProject(field, value) {
        const projCopy = this.state.currentProj;
        if (field[0] === "title") {
            projCopy[field[0]] = value;
        } else {
            projCopy[field[0]] = parseInt(value.value, 10);
        }
        this.setState({
            currentProj: projCopy,
        });
    }

    handleChangeScene(field, value) {
        const currentSceneCopy = this.state.currentScene;
        const scenesCopy = this.state.currentProj.scenes;

        if (field[0] === "name") {
            currentSceneCopy[field[0]] = value;
        }

        const foundIndex = scenesCopy.findIndex(
            (scene) => scene.id === currentSceneCopy.id
        );
        scenesCopy[foundIndex] = currentSceneCopy;

        const currentProjCopy = this.state.currentProj;
        currentProjCopy.scenes = scenesCopy;

        this.setState({
            currentScene: currentSceneCopy,
            currentProj: currentProjCopy,
        });
    }

    saveProject = () => {
        fetch(`${BASE_URL}projects/${this.state.currentProj.id}`, {
            method: "PATCH",
            headers: {
                id_token: Cookies.get("id_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                project: {
                    title: this.state.currentProj.title,
                    tempo: this.state.currentProj.tempo,
                },
            }),
        });
    };

    saveScene = () => {
        fetch(`${BASE_URL}scenes/${this.state.currentScene.id}`, {
            method: "PATCH",
            headers: {
                id_token: Cookies.get("id_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ scene: this.state.currentScene }),
        }).then((res) => res.json());
    };

    newScene(vals) {
        fetch(`${BASE_URL}scenes`, {
            method: "POST",
            headers: {
                id_token: Cookies.get("id_token"),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                scene: {
                    name: vals.name,
                    project_id: this.state.currentProj.id,
                },
            }),
        })
            .then((res) => res.json())
            .then((json) => {
                let projCopy = this.state.currentProj;
                projCopy = {
                    ...projCopy,
                    scenes: [...projCopy.scenes, json],
                    tracks: [...projCopy.tracks, ...json.tracks],
                };
                this.setState({
                    currentProj: projCopy,
                });
            });
    }

    render() {
        return (
            <Router>
                {this.props.loggedIn ? (
                    <Redirect to="/projects" />
                ) : (
                    <Redirect to="/" />
                )}
                {!this.isEmpty(this.state.currentProj) && (
                    <Redirect to="/scenes" />
                )}
                {!this.isEmpty(this.state.currentScene) && (
                    <Redirect
                        to={`/projects/${this.state.currentProj.id}/${this.state.currentScene.id}`}
                    />
                )}
                <Navbar
                    currentProj={this.state.currentProj}
                    loggedIn={this.props.loggedIn}
                    logOut={this.props.logOut}
                />
                <Container textAlign="center" className="main-container">
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Landing getUser={this.props.getUser} />
                        )}
                    />
                    <Route
                        exact
                        path="/projects"
                        render={(props) => (
                            <ProjectsList
                                currentUser={this.props.currentUser}
                                setCurrentProj={this.setCurrentProj}
                                startNewProject={this.startNewProject}
                            />
                        )}
                    />
                    <Route
                        path="/scenes"
                        render={(props) => (
                            <SceneSelector
                                currentUser={this.props.currentUser}
                                currentProj={this.state.currentProj}
                                setCurrentScene={this.setCurrentScene}
                                newScene={this.newScene}
                                handleChangeProject={this.handleChangeProject}
                                saveProject={this.saveProject}
                                projectWasDeleted={this.projectWasDeleted}
                            />
                        )}
                    />
                    <Route
                        path={`/projects/${this.state.currentProj.id}/${this.state.currentScene.id}`}
                        render={(props) => (
                            <ProjectView
                                currentUser={this.props.currentUser}
                                currentProj={this.state.currentProj}
                                currentScene={this.state.currentScene}
                                handleChangeProject={this.handleChangeProject}
                                saveProject={this.saveProject}
                                handleChangeScene={this.handleChangeScene}
                                saveScene={this.saveScene}
                            />
                        )}
                    />
                </Container>
            </Router>
        );
    }
}
