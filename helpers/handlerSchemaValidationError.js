const isConflict = ({ name, code }) => (name==='MongoServerError' && code===11000);

const handlerSchemaValidationError = (error, data, next) => {
    error.status = isConflict(error) ? 409 : 400;
    console.log(error.status)
    next();
}

module.exports = handlerSchemaValidationError;