import React, { Component } from "react";
import { List } from "semantic-ui-react";
import RoutedButton from "../components/RoutedButton";

import "../styles/selector.css";

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderProjects = this.renderProjects.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    isEmpty(obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
        }
        return true;
    }

    handleClick(index) {
        this.props.setCurrentProj(index);
    }

    renderProjects() {
        if (this.props.projects) {
            return (
                <List animated divided selection relaxed="very">
                    {this.props.projects.map((proj, index) => {
                        return (
                            <List.Item
                                key={proj.id}
                                onClick={() => this.handleClick(index)}
                            >
                                <List.Content>
                                    <List.Header as="a">
                                        {proj.title}
                                    </List.Header>
                                </List.Content>
                            </List.Item>
                        );
                    })}
                </List>
            );
        }
        return <div></div>;
    }

    render() {
        return (
            <div className="project-selector">
                <div className="project-header">
                    <h2>Select Project</h2>
                </div>
                <div className="project-list-scrollable">
                    {this.renderProjects()}
                </div>
                <div className="project-button-container">
                    <RoutedButton text="New Project" path="/projects/new" />
                </div>
            </div>
        );
    }
}
