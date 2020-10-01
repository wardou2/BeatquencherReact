import React from "react";
import { Message } from "semantic-ui-react";

const ErrorMessage = ({ errors, attached }) => {
    if (errors.length > 1) {
        return (
            <Message
                warning
                attached={attached}
                compact
                list={errors}
            ></Message>
        );
    }
    return (
        <Message warning attached={attached} compact>
            {errors[0]}
        </Message>
    );
};

export default ErrorMessage;
