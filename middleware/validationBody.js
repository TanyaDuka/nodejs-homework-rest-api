const validationBody = (schema) => {
    const func = async (req, res, next) => {
    
        const { error }=schema.validate(req.body);
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



