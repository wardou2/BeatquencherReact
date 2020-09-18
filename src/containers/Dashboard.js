import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Tone from "tone";
import { Container } from "semantic-ui-react";

import Navbar from "../components/Navbar";
import ProjectsList from "./ProjectsList";
import SceneSelector from "./SceneSelector";
import ProjectView from "./ProjectView";
import NewProjectForm from "../components/NewProjectForm";
import Landing from "../components/Landing";
import {
    newProject,
    saveProject,
    newScene,
    getDefaultProject,
} from "../api/Project";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProj: {},
            currentScene: {},
            isDemo: false,
        };
        this.isEmpty = this.isEmpty.bind(this);
        this.setCurrentProj = this.setCurrentProj.bind(this);
        this.setCurrentScene = this.setCurrentScene.bind(this);
        this.handleChangeProject = this.handleChangeProject.bind(this);
        this.newProject = this.newProject.bind(this);
        this.newScene = this.newScene.bind(this);
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
        this.props.history.push({
            pathname: `/projects/${proj.id}`,
            state: { from: "/projects/" },
        });
    }

    setCurrentScene(scene) {
        Tone.Transport.cancel();
        this.setState({
            currentScene: scene,
        });
        this.props.history.push({
            pathname: `/projects/${this.state.currentProj.id}/${scene.id}`,
            state: { from: `/projects/${this.state.currentProj.id}` },
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

    saveProject = () => {
        saveProject({ project: this.state.currentProj }).catch((err) =>
            console.log(err)
        );
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

    startDemo = async () => {
        const project = await getDefaultProject().catch((err) =>
            console.log(err)
        );
        this.setState({
            isDemo: true,
        });
        this.setCurrentProj(project);
    };

    render() {
        return (
            <>
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
                                <Landing
                                    getUser={this.props.getUser}
                                    startDemo={this.startDemo}
                                />
                            )}
                        />
                    </Switch>
                </Container>
            </>
        );
    }
}

export default withRouter(Dashboard);
