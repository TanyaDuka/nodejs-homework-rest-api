const { Contact } = require('../../models/contact');
const { RequestError } =require('../../helpers/requestError')

const updateStatusContact= async (req, res, next) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {new:true});

 if (!result) {
    throw RequestError(404, `Contact with id=${contactId} not found`);
    }
    
    res.json({
     message: 'Success',
    code: 200,
    data: {
      result
    }
   })
}

module.exports = updateStatusContact;