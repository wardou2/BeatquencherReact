import React from "react";
import { Button, Segment, Grid, Divider } from "semantic-ui-react";
import NewUser from "./NewUser";

const Landing = ({ getUser, startDemo }) => {
    return (
        <div>
            <br></br>
            <Segment placeholder>
                <Grid columns={2} stackable textAlign="center">
                    <Divider vertical>OR</Divider>
                    <Grid.Row verticalAlign="middle">
                        <Grid.Column>
                            <Button onClick={startDemo}>
                                Demo without Logging in
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <NewUser getUser={getUser} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
};

export default Landing;
