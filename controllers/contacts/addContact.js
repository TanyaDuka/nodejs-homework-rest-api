const contactsOperations=require('../../models/contacts')



const addContact = async (req, res, next) => {
    
    console.log(req.body);
  const result = await contactsOperations.addContact(req.body);
  

   res.status(201).json({
     message: 'Success',
    code: 201,
    data: {
      result
    }
   })
 
}


module.exports=addContact