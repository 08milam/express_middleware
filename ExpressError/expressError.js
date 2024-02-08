class ExpressError extends Error {
    constructor(msg, status) {
        super(msg);
        this.status = status;
        this.name = 'ExpressError';
    }
}

module.exports = ExpressError;
