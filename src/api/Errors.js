export default class ValidationError extends Error {
    constructor(message, data) {
        super(message, data);
        this.name = "ValidationError";
        this.data = data;
    }
}
