import React from "react";

const StyledButton = ({ callback, children, ...args }) => {
    const { type, disabled, fluid, negative } = args;
    let className = "link--is-button";
    if (fluid) className += " fluid";
    if (negative) className += " link--is-button--negative";

    return (
        <button
            type={type}
            disabled={disabled}
            className={className}
            onClick={callback}
        >
            {children}
        </button>
    );
};

export default StyledButton;
