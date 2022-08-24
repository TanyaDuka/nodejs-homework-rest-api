const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res, next) => {

        const result = await Contact.find({}, '-createdAt -updatedAt');
  
        res.json({
            message: 'Success',
            code: 200,
            data: {
                result
            }
        })
}

module.exports = getAllContacts;