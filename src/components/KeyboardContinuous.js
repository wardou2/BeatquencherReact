import React, { useState, useEffect, useRef } from "react";

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
const OCTAVES = 8;

const KeyboardContinuous = ({ activeNotes, handleClick }) => {
    const getKeyClass = (note, black = false) => {
        let className = black ? "black-key" : "key";
        if (activeNotes.includes(note)) {
            className += " key-active";
        }
        return className;
    };

    const getHighestNote = (notes) => {
        let highest = "C0";
        if (notes) {
            notes.forEach((note) => {
                const octave = parseInt(note.slice(-1), 10);
                if (octave > parseInt(highest.slice(-1), 10)) {
                    highest = note;
                }
            });
        }
        return highest === "C0" ? "C4" : highest;
    };

    const highestNoteRef = useRef(null);
    const containerRef = useRef(null);
    const [highestNote] = useState(() => getHighestNote(activeNotes));

    useEffect(() => {
        const offsetLeft = highestNoteRef.current?.offsetLeft;
        const containerWidth = containerRef.current?.clientWidth;

        containerRef.current?.scrollTo({
            left: offsetLeft - containerWidth / 2,
            behavior: "smooth",
        });
    }, []);

    const Key = ({ note, black = false }) => {
        return (
            <div
                className={getKeyClass(note, black)}
                key={note}
                onClick={() => {
                    handleClick(note);
                }}
                ref={note === highestNote ? highestNoteRef : null}
            >
                <div>{note}</div>
            </div>
        );
    };

    const renderKeys = () => {
        const keyboard = [];
        keyboard.push(
            <li key="A0" className="key-container">
                <Key note="A0" />
                <Key note="A#0" black />
            </li>
        );
        keyboard.push(
            <li key="B0" className="key-container">
                <Key note="B0" />
            </li>
        );
        for (let x = 1; x < OCTAVES; x += 1) {
            let i = 0;
            while (i < notesList.length) {
                if (notesList[i] === "E" || notesList[i] === "B") {
                    const note = `${notesList[i]}${x}`;
                    keyboard.push(
                        <li key={note} className="key-container">
                            <Key note={note} />
                        </li>
                    );
                    i += 1;
                } else {
                    const note = `${notesList[i]}${x}`;
                    const noteSharp = `${notesList[i + 1]}${x}`;
                    keyboard.push(
                        <li key={note} className="key-container">
                            <Key note={note} />
                            <Key note={noteSharp} black />
                        </li>
                    );
                    i += 2;
                }
            }
        }
        keyboard.push(
            <li key="C8">
                <Key note="C8" />
            </li>
        );
        return keyboard;
    };

    return (
        <ul className="keyboard-container" ref={containerRef}>
            {[...renderKeys()]}
        </ul>
    );
};

export default KeyboardContinuous;
