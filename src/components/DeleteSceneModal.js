import React from "react";
import { Button } from "semantic-ui-react";

import { deleteScene } from "../api/Project";
import DeleteModal from "./DeleteModal";

const DeleteSceneModal = ({ scene, sceneWasDeleted, turnShowOff }) => {
    const handleDelete = () => {
        deleteScene({ id: scene.id })
            .then(() => sceneWasDeleted())
            .catch((err) => console.log(err));
        turnShowOff();
    };

    const Route = <Button negative content="Delete" onClick={handleDelete} />;

    return (
        <DeleteModal
            header={`Delete Scene: ${scene.name}`}
            description="Are you sure you want to delete this scene?"
            route={Route}
            show
            turnShowOff={turnShowOff}
        />
    );
};

export default DeleteSceneModal;
