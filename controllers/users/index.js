const singUp = require('./singUp');
const logIn = require('./logIn');
const logOut = require('./logOut');
const current = require('./current');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');
const verify = require('./verify');
const resendVerify = require('./resendVerify');


module.exports = {
    singUp,
    logIn,
    logOut,
    current,
    updateSubscription,
    updateAvatar,
    verify, 
    resendVerify
}