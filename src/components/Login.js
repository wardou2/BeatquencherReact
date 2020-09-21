import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";
import { getAuth } from "../api/User";
import ErrorMessage from "./ErrorMessage";

function Login({ getUser }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        getAuth(email, password)
            .then(({ token, id }) => {
                Cookies.set("token", token);
                Cookies.set("user_id", id);
                getUser(id);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
                setErrors(err.data);
            });
    };

    return (
        <Modal
            onClose={() => {
                setPassword("");
                setErrors(null);
                setOpen(false);
            }}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<a className="nav-links">Log In</a>}
            size="tiny"
        >
            <Modal.Header>Log in to your account</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Input
                        value={email}
                        onChange={(e, { value }) => setEmail(value)}
                        label="Email:"
                        error={errors?.username}
                    />
                    <Form.Input
                        value={password}
                        onChange={(e, { value }) => setPassword(value)}
                        label="Password:"
                        type="password"
                        error={errors?.password}
                    />
                    <Button.Group
                        floated="right"
                        style={{ marginBottom: "14px" }}
                    >
                        <Button type="button" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" content="Login" primary />
                    </Button.Group>
                </Form>
                {errors?.non_field_errors && (
                    <ErrorMessage errors={errors.non_field_errors} />
                )}
            </Modal.Content>
        </Modal>
    );
}

export default Login;
