import React, { useState, useEffect, useRef, useMemo } from "react";

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
    const getLowestNote = (notes) => {
        let lowest = "C8";
        if (notes) {
            notes.forEach((note) => {
                const octave = parseInt(note.slice(-1), 10);
                if (octave < parseInt(lowest.slice(-1), 10)) {
                    lowest = note;
                }
            });
        }
        return lowest === "C8" ? "C4" : lowest;
    };

    const lowestNoteRef = useRef(null);
    const containerRef = useRef(null);
    const [lowestNote] = useState(() => getLowestNote(activeNotes));

    useEffect(() => {
        const offsetLeft = lowestNoteRef.current?.offsetLeft;
        const containerWidth = containerRef.current?.clientWidth;

        containerRef.current?.scrollTo({
            left: offsetLeft - containerWidth / 2,
            behavior: "smooth",
        });
    }, []);

    const renderKeys = useMemo(() => {
        const getKeyClass = (note, black = false) => {
            let className = black ? "black-key" : "key";
            if (activeNotes?.includes(note)) {
                className += " key-active";
            }
            return className;
        };

        const Key = ({ note, black = false }) => {
            return (
                <div
                    className={getKeyClass(note, black)}
                    key={note}
                    onClick={() => {
                        handleClick(note);
                    }}
                    ref={note === lowestNote ? lowestNoteRef : null}
                >
                    <div>{note}</div>
                </div>
            );
        };

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
    }, [activeNotes, handleClick, lowestNote]);

    return (
        <ul className="keyboard-container" ref={containerRef} tabIndex="0">
            {renderKeys}
        </ul>
    );
};

export default KeyboardContinuous;
