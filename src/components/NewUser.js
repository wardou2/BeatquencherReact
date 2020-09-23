import React, { useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import Cookies from "js-cookie";
import { newUser, getAuth } from "../api/User";
import ErrorMessage from "./ErrorMessage";
import StyledButton from "./StyledButton";

function NewUser({ getUser }) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);
        !disableSubmit() &&
            newUser(email, password1)
                .then(() => getAuth(email, password1))
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

    const validateEmail = () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const disableSubmit = () => {
        return (
            password1 !== password2 || password1.length < 8 || !validateEmail()
        );
    };

    const handleClose = () => {
        setErrors(null);
        setEmail("");
        setPassword1("");
        setPassword2("");
        setOpen(false);
    };

    return (
        <Modal
            onClose={handleClose}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={
                <StyledButton callback={() => setOpen(true)}>
                    CREATE ACCOUNT
                </StyledButton>
            }
            size="tiny"
        >
            <Modal.Header>Create a new account</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit} loading={loading}>
                    <Form.Input
                        value={email}
                        onChange={(e, { value }) => setEmail(value)}
                        label="Email:"
                        error={errors?.email}
                    />
                    <Form.Input
                        value={password1}
                        onChange={(e, { value }) => setPassword1(value)}
                        label="Password:"
                        type="password"
                        error={errors?.password}
                    />
                    <Form.Input
                        value={password2}
                        onChange={(e, { value }) => setPassword2(value)}
                        label="Enter your password again:"
                        type="password"
                    />
                    <Button.Group
                        floated="right"
                        style={{ marginBottom: "14px" }}
                    >
                        <StyledButton callback={handleClose} type="button">
                            Cancel
                        </StyledButton>
                        <StyledButton type="submit" disabled={disableSubmit()}>
                            Create
                        </StyledButton>
                    </Button.Group>
                </Form>
                {errors?.non_field_errors && (
                    <ErrorMessage errors={errors.non_field_errors} />
                )}
            </Modal.Content>
        </Modal>
    );
}

export default NewUser;
