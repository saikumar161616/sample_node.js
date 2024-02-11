/**
 * @constant userSchemaValidator validating the user input
 */
const userModel = require('./users.model');

/**
 * @constant HTTP_STATUS http status codes
 */
const HTTP_STATUS = require('../../constants/http.constants');



/**
 * @class module:usersMiddleware
 * @extends Default class for pre-defined methods
 * @classdesc vaidates inputs before passing to the next function
*/
class UsersMiddleware {
    constructor() {

    }

    /**
     * @method users:middleware:prepareSaveRequest
     * @description validates the input and pass the validated object
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @param {*} next passes the middleware to next method
     * @returns 
    */
    async prepareSaveRequest(req, res, next) {
        try {
            const inputValidation = await userModel.userSchemaValidator.validateAsync(req.body);
            req.validate = inputValidation;
            next();
        } catch (error) {
            console.log('Inside User Middelware: prepareSaveRequest method:  Error occured at saving user: ', error);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: 'Please provide required data.'
            });
        }
    }

    /**
     * @method users:middleware:prepareGenerateAccessTokenRequest
     * @description validates the input and pass the validated object
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @param {*} next passes the middleware to next method
     * @returns 
    */
    async prepareGenerateAccessTokenRequest(req, res, next) {
        try {

            const inputValidation = await userModel.generateAccessTokenValidator.validateAsync(req.params.mobileNumber);
            req.validate = inputValidation;
            next();
        } catch (error) {
            console.log('Inside User Middelware: prepareGenerateAccessTokenRequest method: Error occured while genrating access token: ' + error);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: 'Please provide required data.'
            });
        }
    }

    /**
     * @method users:middleware:prepareUpdateUserRequest
     * @description validates the input and pass the validated object
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @param {*} next passes the middleware to next method
     * @returns 
    */
    async prepareUpdateUserRequest(req, res, next) {
        try {
            const inputValidation = await userModel.updateUserSchemaValidator.validateAsync(req.body);
            req.validate = inputValidation;
            next();
        } catch (error) {
            console.log('Inside User Middelware: prepareUpdateUserRequest method:  Error occured at updating user: ', error);
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                status: false,
                message: 'Please provide required data.'
            });
        }
    }
}

module.exports = new UsersMiddleware();