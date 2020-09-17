import React from "react";
import { Route } from "react-router-dom";
import { Button } from "semantic-ui-react";

const RoutedButton = ({ path, text, callback, ...args }) => {
    return (
        <Route
            render={({ history }) => (
                <Button
                    onClick={() => {
                        if (callback) callback();
                        history.push(path);
                    }}
                    {...args}
                >
                    {text}
                </Button>
            )}
        />
    );
};

export default RoutedButton;
