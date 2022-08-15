const contactsOperations = require('../../models/contacts');


const updateContact= async (req, res, next) => {
  
    

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

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

module.exports = updateContact;