import React from "react";

import "../styles/keyboard.css";

const notesList = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
];

const Keyboard = ({ octave, activeNotes, handleClick }) => {
    const getKeyClass = (note, black = false) => {
        let className = black ? "black-key" : "key";
        if (activeNotes.includes(note)) {
            className += " key-active";
        }
        return className;
    };

    const renderKeys = () => {
        const keyboard = [];
        // Render two octaves
        for (let x = 0; x < 2; x++) {
            let i = 0;
            while (i < notesList.length) {
                if (notesList[i] === "E" || notesList[i] === "B") {
                    const note = `${notesList[i]}${octave + x}`;
                    keyboard.push(
                        <li
                            className={getKeyClass(note)}
                            key={note}
                            onClick={() => {
                                handleClick(note);
                            }}
                        ></li>
                    );
                    i += 1;
                } else {
                    const note = `${notesList[i]}${octave + x}`;
                    const noteSharp = `${notesList[i + 1]}${octave + x}`;
                    keyboard.push(
                        <li
                            className={getKeyClass(note)}
                            key={note}
                            onClick={(e) => {
                                handleClick(note);
                            }}
                        >
                            <div
                                className={getKeyClass(noteSharp, true)}
                                onClick={(e) => {
                                    if (e) {
                                        e.cancelBubble = true;
                                        if (e.stopPropagation)
                                            e.stopPropagation();
                                    }
                                    handleClick(noteSharp);
                                }}
                            ></div>
                        </li>
                    );
                    i += 2;
                }
            }
        }
        return keyboard;
    };

    return (
        <div className="keyboard-container">
            <ul>{[...renderKeys()]}</ul>
        </div>
    );
};

export default Keyboard;
