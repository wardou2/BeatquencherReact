import React, { Component } from "react";
import { Form, Button, Segment } from "semantic-ui-react";

export default class NewProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            tempo: 120,
        };
    }

    handleChange = (_e, { name, value }) => this.setState({ [name]: value });

    handleSubmit = () => {
        this.props.newProject(this.state);
    };

    render() {
        const { name, tempo } = this.state;

        return (
            <div className="projects-list">
                <br></br>
                <Segment>
                    <Form onSubmit={this.handleSubmit}>
                        <h1>New Project</h1>
                        <Form.Input
                            label="Title"
                            placeholder="Title"
                            name="title"
                            value={name}
                            onChange={this.handleChange}
                        />
                        <Form.Input
                            label="Tempo"
                            placeholder="Tempo (bpm)"
                            name="tempo"
                            value={tempo}
                            type={"number"}
                            onChange={this.handleChange}
                        />
                        <Button type="submit">Submit</Button>
                    </Form>
                </Segment>
            </div>
        );
    }
}
