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
            currentScene: {},
            projects: [],
            isDemo: false,
            currentProjIndex: null,
        };
        this.setCurrentProj = this.setCurrentProj.bind(this);
        this.setCurrentScene = this.setCurrentScene.bind(this);
        this.handleChangeProj = this.handleChangeProj.bind(this);
        this.newProject = this.newProject.bind(this);
        this.newScene = this.newScene.bind(this);
        this.projectWasDeleted = this.projectWasDeleted.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUser?.id !== prevProps.currentUser.id) {
            const projectsCopy = JSON.parse(
                JSON.stringify(this.props.currentUser.projects)
            );
            this.setState({ projects: projectsCopy });
        }
    }

    newProject(projectData) {
        // TODO: Error handle
        newProject(projectData)
            .then((project) => {
                const projectsCopy = this.state.projects;
                projectsCopy.push(project);
                this.setState(
                    {
                        projects: projectsCopy,
                        currentProjIndex: projectsCopy.length - 1,
                    },
                    () => this.setCurrentProj(this.state.currentProjIndex)
                );
            })
            .catch((err) => console.log(err));
    }

    projectWasDeleted() {
        const projectsCopy = this.state.projects;
        projectsCopy.splice(this.state.currentProjIndex, 1);
        this.setState({
            currentProjIndex: null,
            projects: projectsCopy,
        });
    }

    setCurrentProj(index) {
        this.setState({
            currentProjIndex: index,
        });
        if (index === null) return;
        const proj = this.state.projects[index];
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
            pathname: `/projects/${
                this.state.projects[this.state.currentProjIndex].id
            }/${scene.id}`,
            state: {
                from: `/projects/${
                    this.state.projects[this.state.currentProjIndex].id
                }`,
            },
        });
    }

    handleChangeProj(field, value, save = false) {
        const currentProjCopy = this.state.projects[
            this.state.currentProjIndex
        ];
        currentProjCopy[field] = value;

        const projectsCopy = this.state.projects;
        projectsCopy[this.state.currentProjIndex] = currentProjCopy;

        save && saveProject({ project: currentProjCopy });
        this.setState({
            projects: projectsCopy,
        });
    }

    saveProject = () => {
        saveProject({
            project: this.state.projects[this.state.currentProjIndex],
        })
            .then((project) => {
                const projectsCopy = this.state.projects;
                projectsCopy[this.state.currentProjIndex] = project;
                this.setState({
                    projects: projectsCopy,
                });
            })
            .catch((err) => console.log(err));
    };

    newScene({ name }) {
        newScene({
            name,
            project: this.state.projects[this.state.currentProjIndex].id,
        }).then((json) => {
            const currentScenesCopy = [
                ...this.state.projects[this.state.currentProjIndex].scenes,
                json,
            ];
            this.handleChangeProj("scenes", currentScenesCopy);
        });
    }

    startDemo = async () => {
        const project = await getDefaultProject().catch((err) =>
            console.log(err)
        );
        this.setState({
            isDemo: true,
            projects: [project],
        });
        this.setCurrentProj(0);
    };

    render() {
        const currentProj = this.state.projects[this.state.currentProjIndex];
        return (
            <>
                {this.props.loggedIn ? (
                    <Redirect to="/projects" />
                ) : (
                    <Redirect to="/" />
                )}
                <Navbar
                    currentProj={currentProj}
                    loggedIn={this.props.loggedIn}
                    logOut={this.props.logOut}
                    getUser={this.props.getUser}
                />
                <Container textAlign="center" className="main-container">
                    <Switch>
                        <Route
                            path={`/projects/${currentProj?.id}/${this.state.currentScene.id}`}
                            render={(props) => (
                                <ProjectView
                                    currentUser={this.props.currentUser}
                                    currentProj={currentProj}
                                    currentScene={this.state.currentScene}
                                    saveProject={this.saveProject}
                                    handleChangeScene={this.handleChangeScene}
                                    handleChangeProj={this.handleChangeProj}
                                    loggedIn={this.props.loggedIn}
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
                            path={`/projects/${currentProj?.id}`}
                            render={(props) => (
                                <SceneSelector
                                    currentUser={this.props.currentUser}
                                    currentProj={currentProj}
                                    setCurrentScene={this.setCurrentScene}
                                    newScene={this.newScene}
                                    handleChangeProj={this.handleChangeProj}
                                    saveProject={this.saveProject}
                                    projectWasDeleted={this.projectWasDeleted}
                                    loggedIn={this.props.loggedIn}
                                />
                            )}
                        />
                        <Route
                            path="/projects"
                            render={(props) => (
                                <ProjectsList
                                    projects={this.state.projects}
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
