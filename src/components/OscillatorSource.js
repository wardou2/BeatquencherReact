import React from "react";

import { sine, square, triangle, sawtooth } from "../images";

const oscTypeOptions = [
    {
        key: "sine",
        text: "Sine",
        value: "sine",
        image: sine,
    },
    {
        key: "square",
        text: "Square",
        value: "square",
        image: square,
    },
    {
        key: "triangle",
        text: "Triangle",
        value: "triangle",
        image: triangle,
    },
    {
        key: "sawtooth",
        text: "Sawtooth",
        value: "sawtooth",
        image: sawtooth,
    },
];

const oscTypeOptionsFM = [
    {
        key: "fmsine",
        text: "FM Sine",
        value: "fmsine",
        image: sine,
    },
    {
        key: "fmsquare",
        text: "FM Square",
        value: "fmsquare",
        image: square,
    },
    {
        key: "fmtriangle",
        text: "FM Triangle",
        value: "fmtriangle",
        image: triangle,
    },
    {
        key: "fmsawtooth",
        text: "FM Sawtooth",
        value: "fmsawtooth",
        image: sawtooth,
    },
];

const OscillatorSource = (props) => {
    const Entry = ({ text, image, value }) => (
        <div
            className="osc-src-option"
            onClick={() => props.handleChange(["oscillator", "type"], value)}
        >
            <img
                src={image}
                alt={text}
                className={
                    props.currentSelection === value
                        ? "osc-src-option--selected"
                        : ""
                }
            />
            <div className="osc-src-option--name">{text}</div>
        </div>
    );

    return (
        <div className="osc-src-container">
            <h3>Oscillator</h3>
            <div className="osc-src-row">
                {oscTypeOptions.map((oscillatorType) => (
                    <Entry
                        text={oscillatorType.text}
                        image={oscillatorType.image}
                        value={oscillatorType.value}
                        key={oscillatorType.key}
                    />
                ))}
            </div>
            <div className="osc-src-row">
                {oscTypeOptionsFM.map((oscillatorType) => (
                    <Entry
                        text={oscillatorType.text}
                        image={oscillatorType.image}
                        value={oscillatorType.value}
                        key={oscillatorType.key}
                    />
                ))}
            </div>
        </div>
    );
};

export default React.memo(OscillatorSource);
