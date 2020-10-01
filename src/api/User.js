import Cookies from "js-cookie";
import ValidationError from "./Errors";
import BASE_URL from "../api_url";

export const getAuth = async (username, password) => {
    const response = await fetch(`${BASE_URL}/authenticate/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
        const json = await response.json();
        throw new ValidationError(
            `HTTP Error! status: ${response.status}`,
            json
        );
    } else {
        return response.json();
    }
};

export const newUser = async (email, password) => {
    const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        const json = await response.json();
        throw new ValidationError(
            `HTTP Error! status: ${response.status}`,
            json
        );
    } else {
        return response.json();
    }
};

export const getUser = async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("token")}`,
        },
    });

    if (!response.ok) {
        const json = await response.json();
        throw new ValidationError(
            `HTTP Error! status: ${response.status}`,
            json
        );
    } else {
        return response.json();
    }
};
