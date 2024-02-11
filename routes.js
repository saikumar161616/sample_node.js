/**
 * @constant router express router method to handle routes efficiently
*/
const router = require('express').Router();

const users = require('./modules/users/users.routes.js')


router.use('/users', users);


module.exports = router;