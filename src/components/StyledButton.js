import React from "react";

const StyledButton = ({ callback, children, ...args }) => {
    const { type, disabled } = args;

    return (
        <button
            type={type}
            disabled={disabled}
            className="link--is-button"
            onClick={callback}
        >
            {children}
        </button>
    );
};

export default StyledButton;
