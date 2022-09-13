const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
    try {
        const email = {
            ...data, from: "duka.tanik@gmail.com"
        }
        await sgMail.send(email);
        return true;
    } catch (error) {
        throw new Error;
    }
};

module.exports= sendEmail