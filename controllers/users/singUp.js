const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');


const { User } = require('../../models/user')

const {RequestError}= require('../../helpers')

const singUp = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw RequestError(409, 'Email already exist')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: '100' });

    const result = await User.create({ email, password: hashPassword ,avatarURL});
  
    res.status(201).json({
        user:{
        email: result.email
    }
    })
}

module.exports = singUp;