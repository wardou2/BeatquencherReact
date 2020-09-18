/* eslint-disable max-classes-per-file */
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
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
import { newProject, saveProject, newScene } from "../api/Project";

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

    newProject(projectData) {
        // TODO: Error handle
        newProject(projectData)
            .then((project) => this.setCurrentProj(project))
            .catch((err) => console.log(err));
    }

    projectWasDeleted() {
        this.setState(
            {
                currentProj: {},
            },
            // Refresh User (with projects) to reflect state on server
            () => this.props.getUser(this.props.currentUser.id)
        );
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
    }

    handleChangeProject(field, value) {
        const projCopy = this.state.currentProj;
        if (field[0] === "title") {
            projCopy[field[0]] = value;
        } else {
            projCopy[field[0]] = parseInt(value.value, 10);
        }
        saveProject({ project: projCopy });
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
        saveProject({ project: this.state.currentProj });
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

    newScene({ name }) {
        newScene({ name, project: this.state.currentProj.id }).then((json) => {
            let projCopy = this.state.currentProj;
            projCopy = {
                ...projCopy,
                scenes: [...projCopy.scenes, json],
            };
            this.setState({
                currentProj: projCopy,
            });
        });
    }

    render() {
        return (
            <DebugRouter>
                {this.props.loggedIn ? (
                    <Redirect to="/projects" />
                ) : (
                    <Redirect to="/" />
                )}
                <Navbar
                    currentProj={this.state.currentProj}
                    loggedIn={this.props.loggedIn}
                    logOut={this.props.logOut}
                    getUser={this.props.getUser}
                />
                <Container textAlign="center" className="main-container">
                    <Switch>
                        <Route
                            path={`/projects/${this.state.currentProj.id}/${this.state.currentScene.id}`}
                            render={(props) => (
                                <ProjectView
                                    currentUser={this.props.currentUser}
                                    currentProj={this.state.currentProj}
                                    currentScene={this.state.currentScene}
                                    handleChangeProject={
                                        this.handleChangeProject
                                    }
                                    saveProject={this.saveProject}
                                    handleChangeScene={this.handleChangeScene}
                                    saveScene={this.saveScene}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/projects/new"
                            render={() => (
                                <NewProjectForm newProject={this.newProject} />
                            )}
                        />
                        <Route
                            path={`/projects/${this.state.currentProj.id}`}
                            render={(props) => (
                                <SceneSelector
                                    currentUser={this.props.currentUser}
                                    currentProj={this.state.currentProj}
                                    setCurrentScene={this.setCurrentScene}
                                    newScene={this.newScene}
                                    handleChangeProject={
                                        this.handleChangeProject
                                    }
                                    saveProject={this.saveProject}
                                    projectWasDeleted={this.projectWasDeleted}
                                />
                            )}
                        />
                        <Route
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
                            path="/"
                            render={(props) => (
                                <Landing getUser={this.props.getUser} />
                            )}
                        />
                    </Switch>
                </Container>
            </DebugRouter>
        );
    }
}

/**
 * Debug Router for React Router
 */
class DebugRouter extends Router {
    constructor(props) {
        super(props);
        console.log(
            "initial history is: ",
            JSON.stringify(this.history, null, 2)
        );
        this.history.listen((location, action) => {
            console.log(
                `The current URL is ${location.pathname}${location.search}${location.hash}`
            );
            console.log(
                `The last navigation action was ${action}`,
                JSON.stringify(this.history, null, 2)
            );
        });
    }
}
