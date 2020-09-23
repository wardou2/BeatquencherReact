import React from "react";

const StyledButton = ({ callback, children }) => {
    return (
        <button className="link--is-button" onClick={callback}>
            {children}
        </button>
    );
};

export default StyledButton;
