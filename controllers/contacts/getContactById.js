const { Contact } = require('../../models/contact');
const {requestError}=require('../../helpers')

const getContactById = async (req, res, next) => {
    const { contactId } = req.params;

    const result = await Contact.findById(contactId, '-createdAt -updatedAt');

    if (!result) {
        throw requestError(404, "Not found");
    }

    res.json({
        message: 'Success',
        code: 200,
        data: {
            result
        }
    })
}

module.exports = getContactById;