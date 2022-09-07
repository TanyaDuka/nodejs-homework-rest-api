const { Contact } = require('../../models/contact');

const addContact = async (req, res, next) => {
  
  const { _id } = req.user;
  console.log(_id)
  const result = await Contact.create({ ...req.body, owner:_id });
  
   res.status(201).json({
     message: 'Success',
    code: 201,
    data: {
      result
    }
   })
}


module.exports=addContact