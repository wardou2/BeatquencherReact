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
const OCTAVES = 6;

const KeyboardContinuous = ({ activeNotes, handleClick }) => {
    const getKeyClass = (note, black = false) => {
        let className = black ? "black-key" : "key";
        if (activeNotes.includes(note)) {
            className += " key-active";
        }
        return className;
    };

    const getHighestNote = (notes) => {
        if (notes) {
            let highest = "C0";
            notes.forEach((note) => {
                const octave = parseInt(note.slice(-1), 10);
                if (octave > parseInt(highest.slice(-1), 10)) {
                    highest = note;
                }
            });
            return highest;
        }
        return "C3";
    };

    const highestNoteRef = useRef(null);
    const containerRef = useRef(null);
    const [highestNote] = useState(getHighestNote(activeNotes));

    useEffect(() => {
        const offsetLeft = highestNoteRef.current?.offsetLeft;
        const containerWidth = containerRef.current?.clientWidth;

        containerRef.current?.scrollTo({
            left: offsetLeft - containerWidth / 2,
            behavior: "smooth",
        });
    }, []);

    const renderKeys = () => {
        const keyboard = [];

        for (let x = 0; x < OCTAVES; x += 1) {
            let i = 0;
            while (i < notesList.length) {
                if (notesList[i] === "E" || notesList[i] === "B") {
                    const note = `${notesList[i]}${x}`;
                    keyboard.push(
                        <li
                            className={getKeyClass(note)}
                            key={note}
                            onClick={() => {
                                handleClick(note);
                            }}
                            ref={note === highestNote ? highestNoteRef : null}
                        >
                            <div>{note}</div>
                        </li>
                    );
                    i += 1;
                } else {
                    const note = `${notesList[i]}${x}`;
                    const noteSharp = `${notesList[i + 1]}${x}`;
                    keyboard.push(
                        <li key={note}>
                            <div
                                className={getKeyClass(note)}
                                onClick={(e) => {
                                    handleClick(note);
                                }}
                                ref={
                                    note === highestNote ||
                                    noteSharp === highestNote
                                        ? highestNoteRef
                                        : null
                                }
                            >
                                <div>{note}</div>
                            </div>
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
                            >
                                <div>{noteSharp}</div>
                            </div>
                        </li>
                    );
                    i += 2;
                }
            }
        }
        return keyboard;
    };

    return (
        <div className="keyboard-container" ref={containerRef}>
            <ul>{[...renderKeys()]}</ul>
        </div>
    );
};

export default KeyboardContinuous;
