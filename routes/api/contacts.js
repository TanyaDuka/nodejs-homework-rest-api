const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');
const { validationBody, isValidId, authenticate } = require('../../middleware');
const { schemaJoi } = require('../../models/contact');
const validationMiddlewareAdd = validationBody(schemaJoi.addSchema);
const validationMiddlewareUpdate =validationBody(schemaJoi.updateSchema);

router.get('/', authenticate, ctrlWrapper(ctrl.getAllContacts) )
  
router.get('/:contactId',authenticate, isValidId, ctrlWrapper(ctrl.getContactById))

router.post('/',authenticate, validationMiddlewareAdd, ctrlWrapper(ctrl.addContact))

router.delete('/:contactId', authenticate, isValidId, ctrlWrapper(ctrl.deleteContact))

router.put('/:contactId', authenticate, isValidId, validationMiddlewareAdd, ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite',authenticate, isValidId, validationMiddlewareUpdate, ctrlWrapper(ctrl.updateStatusContact))


module.exports = router
