const { RequestError } = require('../../helpers');
const { Contact } = require('../../models/contact');


const deleteContact=async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);

     if (!result) {
    throw RequestError(404, `Contact with id=${contactId} not found`);
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