import React from "react";

import "../styles/channel-slider.css";

const ChannelSlider = ({ label, callback, classes, ...rest }) => {
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
            />
        </div>
    );
};

export default ChannelSlider;
