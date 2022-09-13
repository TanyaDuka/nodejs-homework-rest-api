const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const { User } = require('../../models/user')

const {RequestError, sendEmail}= require('../../helpers')

const singUp = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (user) {
        throw RequestError(409, 'Email already exist')
    }
    
    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: '100' });

     const verificationToken = uuidv4();

    const result = await User.create({ email, password: hashPassword ,avatarURL, verificationToken});
  
    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`
    }
    await sendEmail(mail);

    res.status(201).json({
        user:{
        email: result.email
    }
    })
}

module.exports = singUp;