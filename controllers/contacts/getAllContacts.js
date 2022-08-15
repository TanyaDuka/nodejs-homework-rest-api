const contactsOperations=require('../../models/contacts')

const getAllContacts = async (req, res, next) => {

        const result = await contactsOperations.listContacts();
  
        res.json({
            message: 'Success',
            code: 200,
            data: {
                result
            }
        })

}

module.exports = getAllContacts;