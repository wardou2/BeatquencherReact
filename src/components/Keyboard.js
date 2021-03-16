import React, {
    useEffect,
    useState,
    useMemo,
    useCallback,
    useRef,
} from "react";

import { Icon } from "semantic-ui-react";

import "../styles/keyboard.css";

const Keys = ({ notesList, heldKeys, playNote }) => {
    // Track if mouse is held to correctly trigger attack/release for notes
    const [mouseHeld, setMouseHeld] = useState(false);

    const handleClick = (e, note) => {
        if (e.type === "mousedown") {
            playNote({ note, type: "attack" });
            setMouseHeld(true);
        } else if (e.type === "mouseleave" && mouseHeld) {
            playNote({ note, type: "release" });
        } else if (e.type === "mouseenter" && mouseHeld) {
            playNote({ note, type: "attack" });
        } else if (e.type === "mouseup") {
            playNote({ note, type: "release" });
            setMouseHeld(false);
        }
    };

    const getKeyClass = ({ black, key }) => {
        let className = black ? "black-key" : "key";

        if (heldKeys[key]) {
            className += " key-active";
        }
        return className;
    };

    const Key = ({ note, keyPress, black = false }) => {
        return (
            <div
                className={getKeyClass({ black, key: keyPress })}
                key={note}
                onMouseDown={(e) => handleClick(e, note)}
                onMouseUp={(e) => handleClick(e, note)}
                onMouseLeave={(e) => handleClick(e, note)}
                onMouseEnter={(e) => handleClick(e, note)}
                id={keyPress}
            >
                {keyPress}
            </div>
        );
    };

    const renderKeys = () => {
        const keyboard = [];

        // Render one octave
        let i = 0;
        const keys = Object.keys(notesList);
        while (i < keys.length - 1) {
            if (
                notesList[keys[i]].slice(0, 1) === "E" ||
                notesList[keys[i]].slice(0, 1) === "B"
            ) {
                const note = notesList[keys[i]];
                const key = keys[i];
                keyboard.push(
                    <li key={note} className="key-container">
                        <Key note={note} keyPress={key} />
                    </li>
                );
                i += 1;
            } else {
                const note = notesList[keys[i]];
                const key = keys[i];
                const noteSharp = notesList[keys[i + 1]];
                const keySharp = keys[i + 1];

                keyboard.push(
                    <li key={note} className="key-container">
                        <Key note={note} keyPress={key} />
                        <Key note={noteSharp} keyPress={keySharp} black />
                    </li>
                );
                i += 2;
            }
        }
        // Manage last C separately to avoid rendering C#
        keyboard.push(
            <li
                key={notesList[keys[keys.length - 1]]}
                className="key-container"
            >
                <Key
                    note={notesList[keys[keys.length - 1]]}
                    keyPress={keys[keys.length - 1]}
                />
            </li>
        );

        return keyboard;
    };

    return (
        <div
            className="keyboard-container-mini"
            onMouseLeave={() => setMouseHeld(false)}
        >
            <ul>{[...renderKeys()]}</ul>
        </div>
    );
};

const OctaveButtons = ({ octave, handleOctave }) => {
    return (
        <div className="octave-button-container">
            <div
                className="octave-button octave-button--left"
                onClick={() => handleOctave({ increase: false })}
            >
                <Icon style={{ marginBottom: "4px" }} name="arrow left"></Icon>
                <div>Z</div>
            </div>
            <div className="octave-display">
                <div className="octave-title">Octave:</div>
                <div className="octave-number">{octave}</div>
            </div>
            <div
                className="octave-button octave-button--right"
                onClick={() => handleOctave({ increase: true })}
            >
                <div>X</div>
                <Icon style={{ marginBottom: "4px" }} name="arrow right"></Icon>
            </div>
        </div>
    );
};

const Keyboard = ({ playNote }) => {
    const [octave, setOctave] = useState(3);
    const [heldKeys, setHeldKeys] = useState({});
    const notesList = useMemo(
        () => ({
            A: `C${octave}`,
            W: `C#${octave}`,
            S: `D${octave}`,
            E: `D#${octave}`,
            D: `E${octave}`,
            F: `F${octave}`,
            T: `F#${octave}`,
            G: `G${octave}`,
            Y: `G#${octave}`,
            H: `A${octave}`,
            U: `A#${octave}`,
            J: `B${octave}`,
            K: `C${octave + 1}`,
        }),
        [octave]
    );

    const handleOctave = useCallback(
        ({ increase }) => {
            let newOctave = octave;
            if (increase) {
                newOctave += 1;
            } else {
                newOctave -= 1;
            }
            if (newOctave < 8 && newOctave >= 0) {
                setOctave(newOctave);
            }
        },
        [octave]
    );

    // Track octave change in order to cancel all active notes
    const prevOctaveRef = useRef();
    useEffect(() => {
        prevOctaveRef.current = octave;
    });
    const hasOctaveChanged = prevOctaveRef.current !== octave;
    if (hasOctaveChanged) {
        Object.keys(heldKeys).forEach((key) => {
            playNote({ note: heldKeys[key], type: "release" });
        });
    }

    useEffect(() => {
        const handleKeydown = (e) => {
            if (e.repeat) return;
            const key = e.key.toUpperCase();
            const note = notesList[key];

            setHeldKeys((prev) => {
                const prevCopy = { ...prev };
                prevCopy[key] = note;
                return prevCopy;
            });

            if (note) {
                playNote({ note, type: "attack" });
            } else if (key === "Z") {
                handleOctave({ increase: false });
            } else if (key === "X") {
                handleOctave({ increase: true });
            }
        };

        const handleKeyup = (e) => {
            const key = e.key.toUpperCase();

            setHeldKeys((prev) => {
                const prevCopy = { ...prev };
                delete prevCopy[key];
                return prevCopy;
            });

            const note = notesList[key];
            if (note) {
                playNote({ note, type: "release" });
            }
        };

        document.addEventListener("keydown", handleKeydown, false);
        document.addEventListener("keyup", handleKeyup, false);

        return () => {
            document.removeEventListener("keydown", handleKeydown, false);
            document.removeEventListener("keyup", handleKeyup, false);
        };
    }, [handleOctave, notesList, playNote, setHeldKeys]);

    return (
        <div className="keyboard-container-mini-wrapper">
            <Keys
                octave={octave}
                handleOctave={handleOctave}
                playNote={playNote}
                notesList={notesList}
                heldKeys={heldKeys}
                setHeldKeys={setHeldKeys}
            />
            <OctaveButtons octave={octave} handleOctave={handleOctave} />
        </div>
    );
};

export default Keyboard;
