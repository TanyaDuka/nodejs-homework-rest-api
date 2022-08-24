// const { requestError } =require('../helpers')

const validationBody = (schema) => {
    const func = async (req, res, next) => {
        const { error } = schema.validate(req.body);
    
        if (error.message === '"favorite" is required') {
            error.status = 400;
            error.message = "missing field favorite";
            next(error);
            return;
        }
        if (error) {
            error.status = 400;
            next(error);
            return;
        }
        next();
    }
    return func;
}

module.exports = validationBody



