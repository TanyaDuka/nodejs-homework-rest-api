const { User } = require('../../models/user')


const current = async (req, res, next) => {
    const { _id } = req.user;

    const user = await User.findById(_id);

    res.status(200).json({
        email: user.email,
        subscription:user.subscription
    })
}

module.exports = current;

