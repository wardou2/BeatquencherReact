import React from "react";

import "../styles/channel-slider.css";

const ChannelSlider = ({ label, callback, value, ...rest }) => {
    return (
        <div className="channel-slider-container">
            <label>{label}</label>
            <input
                type="range"
                value={value}
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
