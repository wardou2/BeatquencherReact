import React from "react";

import "../styles/channel-slider.css";

const ChannelSlider = ({ label, callback, classes, disabled, ...rest }) => {
    return (
        <div className={classes}>
            <label>{label}</label>
            <input
                type="range"
                {...rest}
                onChange={(e) => {
                    callback(e);
                }}
                className="channel-slider"
                disabled={disabled}
            />
        </div>
    );
};

export default ChannelSlider;
