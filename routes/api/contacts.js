const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');


const validationBody    = require('../../middleware');
const { schema } = require('../../schemas');
console.log(schema.add);
 const validationMiddleware =validationBody(schema.add);

router.get('/', ctrlWrapper(ctrl.getAllContacts) )
  
router.get('/:contactId',ctrlWrapper(ctrl.getContactById))

router.post('/',validationMiddleware, ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', ctrlWrapper(ctrl.deleteContact))

router.put('/:contactId', validationMiddleware, ctrlWrapper(ctrl.updateContact))

module.exports = router
