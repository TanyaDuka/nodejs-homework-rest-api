const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validationBody, isValidId } = require('../../middleware');
const { schemaJoi } = require('../../models/contact');
const validationMiddlewareAdd = validationBody(schemaJoi.addSchema);
const validationMiddlewareUpdate =validationBody(schemaJoi.updateSchema);


router.get('/', ctrlWrapper(ctrl.getAllContacts) )
  
router.get('/:contactId',isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/',validationMiddlewareAdd, ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact))

router.put('/:contactId', isValidId, validationMiddlewareAdd, ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', isValidId, validationMiddlewareUpdate, ctrlWrapper(ctrl.updateStatusContact))


module.exports = router
