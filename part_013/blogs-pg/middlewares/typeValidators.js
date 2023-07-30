class PostBlogTypeValidatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PostBlogTypeValidatorError';
    }
}

module.exports = {
    PostBlogTypeValidatorError
}