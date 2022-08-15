const contactsOperations = require('../../models/contacts');
const getContactById = async (req, res, next) => {
    
    const { contactId } = req.params;
    console.log(contactId);

        const result = await contactsOperations.getContactById(contactId);

        if (!result) {

            const error = new Error(`Contact with id=${contactId} not found`);
            error.status = 404;
            throw error;
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