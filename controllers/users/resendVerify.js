const { User } = require("../../models/user");
const {RequestError, sendEmail}=require('../../helpers')

const resendVerify = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw RequestError(404, "User not found")
    }

const verificationToken = await user.verificationToken;

    if (user.verify) {
        throw RequestError(400, "Verification has already been passed")
    }

       const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        html: `<a href="http://localhost:3000/api/auth/verify/${verificationToken}" target="_blank">Нажмите для подтверждения email</a>`
    }
    await sendEmail(mail);

    res.json({
        message: "Verification email sent"
    })

}

module.exports=resendVerify