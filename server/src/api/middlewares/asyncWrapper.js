
// Async wrapper for handling asynchronous routes and logging successful responses
const asyncWrapper = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncWrapper;