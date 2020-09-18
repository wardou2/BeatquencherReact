import React, { useState } from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";
import { getAuth } from "../api/User";

function Login({ getUser }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = () => {
        getAuth(email, password)
            .then(({ token, id }) => {
                Cookies.set("token", token);
                Cookies.set("user_id", id);
                getUser(id);
            })
            .catch((err) => console.log(err));
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Login</Button>}
        >
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Log in to your account</Header>
                    <Form>
                        <Form.Input
                            value={email}
                            onChange={(e, { value }) => setEmail(value)}
                            label="Email"
                        />
                        <Form.Input
                            value={password}
                            onChange={(e, { value }) => setPassword(value)}
                            label="Password"
                            type="password"
                        />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button content="Login" onClick={handleSubmit} positive />
            </Modal.Actions>
        </Modal>
    );
}

export default Login;
