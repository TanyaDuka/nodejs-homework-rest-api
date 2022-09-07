const { Contact } = require('../../models/contact');

const getAllContacts = async (req, res, next) => {
    const { _id } = req.user;
    const { page = 1, limit = 5, favorite } = req.query;
    
    const skip = (page - 1) * limit;

    const result = await Contact.find(favorite ? {owner:_id, favorite}:{ owner: _id }, '-createdAt -updatedAt', {skip, limit:Number(limit)})
                                .populate('owner', '_id email subscription')
  
        res.json({
            message: 'Success',
            code: 200,
            data: {
                result
            }
        })
}

module.exports = getAllContacts;