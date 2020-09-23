import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Tone from "tone";

import Navbar from "../components/Navbar";
import ProjectsList from "./ProjectsList";
import SceneSelector from "./SceneSelector";
import ProjectView from "./ProjectView";
import NewProjectForm from "../components/NewProjectForm";

import { newProject, saveProject, newScene, saveScene } from "../api/Project";

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
        this.sceneWasDeleted = this.sceneWasDeleted.bind(this);
        this.sceneWasSaved = this.sceneWasSaved.bind(this);
    }

    componentDidMount() {
        if (this.props.currentUser.projects) {
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

    renameScene(sceneId, newName) {
        let sceneCopy;
        const scenesCopy = this.currentProj.scenes.map((scene) => {
            if (scene.id === sceneId) {
                sceneCopy = JSON.parse(JSON.stringify(scene));
                sceneCopy.name = newName;
                return sceneCopy;
            }
            return scene;
        });

        saveScene({ scene: sceneCopy }).catch((err) => console.log(err));

        this.handleChangeProj("scenes", scenesCopy);
    }

    sceneWasSaved(changedScene) {
        const scenesCopy = this.currentProj.scenes.map((scene) => {
            return scene.id === changedScene.id ? changedScene : scene;
        });
        this.handleChangeProj("scenes", scenesCopy);
    }

    sceneWasDeleted(sceneId) {
        const currentScenesCopy = this.currentProj.scenes.filter(
            (scene) => scene.id !== sceneId
        );

        this.handleChangeProj("scenes", currentScenesCopy);
    }

    render() {
        this.currentProj = this.state.projects[this.state.currentProjIndex];
        return (
            <>
                <div className="main-container">
                    <Navbar
                        currentProj={this.currentProj}
                        loggedIn={this.props.loggedIn}
                        logOut={this.props.logOut}
                        getUser={this.props.getUser}
                    />
                    <Switch>
                        <Route
                            path={`/projects/${this.currentProj?.id}/${this.state.currentScene.id}`}
                            render={(props) => (
                                <ProjectView
                                    currentUser={this.props.currentUser}
                                    currentProj={this.currentProj}
                                    currentScene={this.state.currentScene}
                                    saveProject={this.saveProject}
                                    handleChangeScene={this.handleChangeScene}
                                    handleChangeProj={this.handleChangeProj}
                                    loggedIn={this.props.loggedIn}
                                    sceneWasSaved={this.sceneWasSaved}
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
                            path={`/projects/${this.currentProj?.id}`}
                            render={(props) => (
                                <SceneSelector
                                    currentProj={this.currentProj}
                                    setCurrentScene={this.setCurrentScene}
                                    newScene={this.newScene}
                                    handleChangeProj={this.handleChangeProj}
                                    saveProject={this.saveProject}
                                    projectWasDeleted={this.projectWasDeleted}
                                    loggedIn={this.props.loggedIn}
                                    renameScene={this.renameScene}
                                    sceneWasDeleted={this.sceneWasDeleted}
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
                    </Switch>
                </div>
            </>
        );
    }
}

export default withRouter(Dashboard);
