import { toInteger } from "lodash";
import React, { useState } from "react";
import { Button, Icon, Label, Grid } from "semantic-ui-react";
import Tone from "tone";
import EditableText from "./EditableText";

const ProjectControls = ({
    playInstruments,
    saveAll,
    isPlaying,
    loggedIn,
    currentProj,
    handleChangeProj,
}) => {
    const [editingTempo, setEditingTempo] = useState(false);
    const [warning, setWarning] = useState(null);

    const isSafeTempo = (tempo) => {
        return tempo >= 20 && tempo <= 300;
    };

    const handleChangeTempo = (tempo) => {
        const intTempo = toInteger(tempo);

        if (isSafeTempo(intTempo)) {
            setWarning(null);
            handleChangeProj("tempo", intTempo);
            Tone.Transport.bpm.value = intTempo;
            setEditingTempo(false);
        } else {
            setWarning("Tempo out of range!");
        }
    };

    const handleButtonTempo = ({ up }) => {
        let newTempo = toInteger(currentProj.tempo);
        if (up) {
            newTempo += 1;
        } else {
            newTempo -= 1;
        }
        if (isSafeTempo(newTempo)) {
            setWarning(null);

            handleChangeProj("tempo", newTempo);
            Tone.Transport.bpm.value = newTempo;
        } else {
            setWarning("Tempo out of range!");
        }
    };

    return (
        <div className="project-info-div">
            <Grid verticalAlign="middle" padded>
                <Grid.Column width={4} />
                <Grid.Column width={8}>
                    <Button
                        icon
                        labelPosition="right"
                        onClick={playInstruments}
                    >
                        {isPlaying ? (
                            <Icon name="pause" />
                        ) : (
                            <Icon name="play" />
                        )}
                        {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <Button
                        icon
                        labelPosition="left"
                        onClick={saveAll}
                        disabled={!loggedIn}
                    >
                        Save
                        <Icon name="save" />
                    </Button>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Label size="medium">
                        Tempo:
                        <Label.Detail
                            as="a"
                            onClick={() => setEditingTempo(true)}
                        >
                            <EditableText
                                text={currentProj.tempo}
                                editing={editingTempo}
                                submit={handleChangeTempo}
                            />
                        </Label.Detail>
                        <Label.Detail as="a">
                            <Icon
                                name="arrow up"
                                onClick={() => handleButtonTempo({ up: true })}
                            />
                        </Label.Detail>
                        <Label.Detail as="a">
                            <Icon
                                name="arrow down"
                                onClick={() =>
                                    handleButtonTempo({
                                        up: false,
                                    })
                                }
                            />
                        </Label.Detail>
                    </Label>
                    {warning && (
                        <Label color="red">
                            <Icon name="warning" />
                            <Label.Detail>{warning}</Label.Detail>
                        </Label>
                    )}
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default ProjectControls;
