class ApiError extends Error {

    constructor(status, message, errors) {
        super(message);
        this.status = status
        this.errors = errors

    }

    static unauthorizedRequest() {
        return new ApiError(401, 'Unauthorized user')
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
    
    static internalRequest(message) {
        return new ApiError(500, message) 
    }

    static forbiddenRequest(message) {
        return new ApiError(403, message) 
    }
}

module.exports = ApiError