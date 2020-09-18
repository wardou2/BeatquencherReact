import React from "react";
import { Button, Segment } from "semantic-ui-react";
import NewUser from "./NewUser";

const Landing = ({ getUser }) => {
    return (
        <div>
            <br></br>
            <Segment>
                <Button.Group>
                    <Button>Demo without Logging in</Button>
                    <Button.Or />
                    <NewUser getUser={getUser} />
                </Button.Group>
            </Segment>
        </div>
    );
};

export default Landing;
