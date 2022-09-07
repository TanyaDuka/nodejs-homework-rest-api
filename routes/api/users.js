const express = require('express');

const router = express.Router();

const ctrl  = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');

const { validationBody, isValidId, authenticate } = require('../../middleware');
const { schemaJoi } = require('../../models/user');


router.post('/register', validationBody(schemaJoi.singUpSchema), ctrlWrapper(ctrl.singUp));
router.post('/login', validationBody(schemaJoi.loginSchema), ctrlWrapper(ctrl.logIn));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logOut));
router.get('/current', authenticate, ctrlWrapper(ctrl.current));
router.patch('/:id/subscription', authenticate ,isValidId, validationBody(schemaJoi.updateSubscription), ctrlWrapper(ctrl.updateSubscription))

module.exports = router;