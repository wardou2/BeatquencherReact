const BASE_URL =
    process.env.NODE_ENV === "production"
        ? "https://pacific-castle-49600.herokuapp.com"
        : "http://localhost:8000";

export default BASE_URL;
