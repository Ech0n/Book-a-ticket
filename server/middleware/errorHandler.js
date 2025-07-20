export default (err, req, res, next) => {
    console.error(err.stack);

    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong';

    const responseBody = { message };
    if (err.errors) {
        responseBody.errors = err.errors;
    }

    res.status(status).json(responseBody);
};
