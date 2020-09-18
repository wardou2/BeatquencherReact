import React, { useState } from "react";
import { Button, Form, Header, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";
import { newUser, getAuth } from "../api/User";

function NewUser({ getUser }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const handleSubmit = () => {
        newUser(email, password)
            .then(() => getAuth(email, password))
            .then(({ token, id }) => {
                Cookies.set("token", token);
                Cookies.set("user_id", id);
                getUser(id);
            })
            .catch((err) => console.log(err));
    };

    const validateEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const disableSubmit = () => {
        return (
            password !== password2 || password.length < 8 || !validateEmail()
        );
    };

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button primary>Create Account</Button>}
            size="small"
        >
            <Modal.Header>Login</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Header>Create a new account</Header>
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
                        <Form.Input
                            value={password2}
                            onChange={(e, { value }) => setPassword2(value)}
                            label="Enter password again"
                            type="password"
                        />
                    </Form>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="black" onClick={() => setOpen(false)}>
                    Cancel
                </Button>
                <Button
                    content="Login"
                    onClick={handleSubmit}
                    positive
                    disabled={disableSubmit()}
                />
            </Modal.Actions>
        </Modal>
    );
}

export default NewUser;
