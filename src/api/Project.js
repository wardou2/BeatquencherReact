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
