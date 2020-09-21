import React, { Component } from "react";
import { List, Header, Segment } from "semantic-ui-react";
import RoutedButton from "../components/RoutedButton";

export default class ProjectsList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.renderProjects = this.renderProjects.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.setCurrentProj(null);
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
                <List divided relaxed>
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
            <div className="projects-list">
                <br></br>
                <Segment>
                    <Header as="h2">Select Project</Header>
                    <RoutedButton text="New Project" path="/projects/new" />
                    {this.renderProjects()}
                </Segment>
            </div>
        );
    }
}
