import React, { Component } from "react";
import { List, Header, Button, Segment } from "semantic-ui-react";

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

    handleClick(proj) {
        this.props.setCurrentProj(proj);
    }

    renderProjects() {
        if (!this.isEmpty(this.props.currentUser)) {
            return (
                <List divided relaxed>
                    {this.props.currentUser.projects.map((proj) => {
                        return (
                            <List.Item
                                key={proj.id}
                                onClick={() => this.handleClick(proj)}
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
            <div className="projects-list">
                <br></br>
                <Segment>
                    <Header as="h2">Select Project</Header>
                    <Button onClick={this.props.startNewProject}>
                        New Project
                    </Button>
                    {this.renderProjects()}
                </Segment>
            </div>
        );
    }
}
