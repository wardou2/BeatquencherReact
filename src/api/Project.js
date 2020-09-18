import Cookies from "js-cookie";
import BASE_URL from "../api_url";

export const newProject = async ({ title, tempo }) => {
    const response = await fetch(`${BASE_URL}/projects/`, {
        method: "POST",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            tempo,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const saveProject = async ({ project }) => {
    const response = await fetch(`${BASE_URL}/projects/${project.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: project.title,
            tempo: project.tempo,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const deleteProject = async ({ id }) => {
    const response = await fetch(`${BASE_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }
};

export const newScene = async ({ name, project }) => {
    const response = await fetch(`${BASE_URL}/scenes/`, {
        method: "POST",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            project,
            tracks: [],
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const saveScene = async ({ scene }) => {
    const response = await fetch(`${BASE_URL}/scenes/${scene.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scene),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const saveInstrument = async ({ ins }) => {
    const response = await fetch(`${BASE_URL}/instruments/${ins.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Token ${Cookies.get("token")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            instrument: {
                ins_type: ins.ins_type,
                options: ins.options,
                effects: ins.effects,
            },
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};

export const getDefaultProject = async () => {
    const response = await fetch(`${BASE_URL}/projects/default`, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    } else {
        return response.json();
    }
};
