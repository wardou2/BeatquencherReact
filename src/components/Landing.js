import React from "react";
import { Button, Segment } from "semantic-ui-react";
import Login from "./Login";

const Landing = ({ getUser }) => {
    return (
        <div className="projects-list">
            <br></br>
            <Segment>
                <Button.Group>
                    <Button>Demo without Logging in</Button>
                    <Button.Or />
                    <Login getUser={getUser} />
                </Button.Group>
            </Segment>
        </div>
    );
};

export default Landing;
