import Cookies from "js-cookie";
import BASE_URL from "../api_url";

// eslint-disable-next-line import/prefer-default-export
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
        throw new Error(`HTTP Error! status: ${response}`);
    } else {
        return response.json();
    }
};
