const contactsOperations = require('../../models/contacts');


const deleteContact=async (req, res, next) => {
  
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

     if (!result) {

    const error = new Error(`Contact with id=${contactId} not found`);
    error.status = 404;
    throw error;
    
    }
    
    res.json({
     message: 'Contact deleted',
    code: 200,
    data: {
      result
    }
   })
  
}

module.exports = deleteContact;