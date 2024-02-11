
/**
 * @constant router express router method to handle routes efficiently
*/
const router = require('express').Router();

/**
 * @constant usersMiddleware middleware to handle user requests before passing to controller
*/
const usersMiddleware = require('./users.middleware');

/**
 * @constant usersController to perform operation on users module at database
*/
const usersController = require('./users.controller');

/**
 * @constant middleware middleware method to handle authenticate routes
*/
const AuthMiddleware = require('../../config/authMiddleware');

/**
 * post a User
*/
router.post('/',
    (req, res, next) => usersMiddleware.prepareSaveRequest(req, res, next),
    (req, res) => usersController.saveUserController(req, res));

router.get('/generate-token/:mobileNumber',
    (req, res, next) => usersMiddleware.prepareGenerateAccessTokenRequest(req, res, next),
    (req, res) => usersController.generateAccessTokenController(req, res))

router.get('/',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => usersController.getAllUsers(req, res));

router.get('/:uniqueId',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => usersController.getUserByIdController(req, res));

router.put('/:uniqueId',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res, next) => usersMiddleware.prepareUpdateUserRequest(req, res, next),
    (req, res) => usersController.updateUser(req, res));

//To delete any user related record (document) logged in user must be admin (isAdmin : true)
router.delete('/:uniqueId',
    (req, res, next) => AuthMiddleware.authenticate(req, res, next),
    (req, res) => usersController.deleteUserController(req, res));

module.exports = router;