import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";
import { getAuth } from "../api/User";
import NewUser from "./NewUser";
import ErrorMessage from "./ErrorMessage";
import StyledButton from "./StyledButton";

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
                handleClose();
            })
            .catch((err) => {
                setLoading(false);
                setErrors(err.data);
            });
    };

    const handleClose = () => {
        setPassword("");
        setErrors(null);
        setLoading(false);
        setOpen(false);
    };

    return (
        <Modal
            onClose={handleClose}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <StyledButton callback={() => setOpen(true)}>
                    LOG IN / CREATE ACCOUNT
                </StyledButton>
            }
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
                        <StyledButton callback={handleClose} type="button">
                            Cancel
                        </StyledButton>
                        <StyledButton primary type="submit">
                            Login
                        </StyledButton>
                    </Button.Group>
                </Form>
                {errors?.non_field_errors && (
                    <ErrorMessage errors={errors.non_field_errors} />
                )}
                <NewUser getUser={getUser} />
            </Modal.Content>
        </Modal>
    );
}

export default Login;
