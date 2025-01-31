const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/user')

const { RequestError } = require('../../helpers')

const { SECRET_KEY } = process.env;

const logIn = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
        throw RequestError(401, 'no user') 
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
        throw RequestError(401, 'Email or password is wrong')
    }

    const payload = {
        id:user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '5h' });
   

    await User.findByIdAndUpdate(user._id, { token });



    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
        })
}

module.exports = logIn;