const express = require('express');

const router = express.Router();

const ctrl  = require('../../controllers/users');
const { ctrlWrapper } = require('../../helpers');

const { validationBody, isValidId, authenticate, upload, verification } = require('../../middleware');
const { schemaJoi } = require('../../models/user');

// singUp
router.post('/register', validationBody(schemaJoi.singUpSchema), ctrlWrapper(ctrl.singUp));
router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verify));
router.post('/verify', validationBody(schemaJoi.verifySchema), ctrlWrapper(ctrl.resendVerify))
// singIn
router.post('/login', validationBody(schemaJoi.loginSchema), verification, ctrlWrapper(ctrl.logIn));
router.get('/logout', authenticate, ctrlWrapper(ctrl.logOut));
router.get('/current', authenticate, ctrlWrapper(ctrl.current));
router.patch('/:id/subscription', authenticate ,isValidId, validationBody(schemaJoi.updateSubscription), ctrlWrapper(ctrl.updateSubscription))
router.patch('/avatars',authenticate, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar))

module.exports = router;