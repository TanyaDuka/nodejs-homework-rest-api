const { User } = require('../models/user');
const { RequestError } =require('../helpers')

const verification = async (req, res, next) => {
    const { email } = req.body;
const user = await User.findOne({ email });
    const verify = user.verify;

    if (!verify) {
        const error = RequestError(400, `${email} is not verification`);
        next(error);
    }
    next();

}

module.exports = verification;