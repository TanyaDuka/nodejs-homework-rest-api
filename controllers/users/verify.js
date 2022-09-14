const { User } = require('../../models/user');
const {RequestError}= require('../../helpers')
const verify = async (req, res, next) => {
    const { verificationToken } = req.params;
    if (!verificationToken) {
        throw RequestError(404, "Wrong verificationToken")
    }
    const user = await User.findOne({ verificationToken });
    
    if (!user) {
        throw RequestError(404, 'User not found')
    }

    await User.findOneAndUpdate({verificationToken}, {verificationToken :null, verify: true})

    res.json({
        message:'Verification successful'
    })
}

module.exports = verify;