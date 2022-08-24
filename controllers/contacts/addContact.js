const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  
   res.status(201).json({
     message: 'Success',
    code: 201,
    data: {
      result
    }
   })
}


module.exports=addContact