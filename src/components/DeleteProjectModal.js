import React from "react";

import { deleteProject } from "../api/Project";
import DeleteModal from "./DeleteModal";
import RoutedButton from "./RoutedButton";

const DeleteProjectModal = ({
    currentProj,
    projectWasDeleted,
    turnShowOff,
}) => {
    const handleDelete = () => {
        deleteProject({ id: currentProj.id })
            .then(() => projectWasDeleted())
            .catch((err) => console.log(err));
    };

    const Route = (
        <RoutedButton
            negative
            text="Delete"
            callback={handleDelete}
            path="/projects"
        />
    );

    return (
        <DeleteModal
            header="Delete Project"
            description="Are you sure you want to delete this project?"
            route={Route}
            show
            turnShowOff={turnShowOff}
        />
    );
};

export default DeleteProjectModal;
