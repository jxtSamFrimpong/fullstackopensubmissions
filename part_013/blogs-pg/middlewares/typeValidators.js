class PostBlogTypeValidatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PostBlogTypeValidatorError';
    }
}

class PasswordError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PasswordValidationError';
    }
}

module.exports = {
    PostBlogTypeValidatorError,
    PasswordError
}