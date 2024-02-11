/**
* @constant jwt library to generate jwt token
*/
const jwt = require('jsonwebtoken');

/**
 * @constant HTTP_STATUS http status codes
 */
const HTTP_STATUS = require('../constants/http.constants');
const { userModel } = require('./../modules/users/users.model');

/**
 * @class Middleware methods of the application
 * @desc contains all the middleware methods of the application.
 * @returns middleware class
 */
class AuthMiddleware {
    constructor() {
        this.jwtSecretKey = 'S&7tZ5fT^x@K#E!Y';
    }
    /**
     * @method authenticate verifies jwt token
     * @description verifies jwt auth token, if error returns unauthorized message
     * @returns passes the middleware to the next method.
    */
    async authenticate(req, res, next) {
        try {
            let tokenHeader = req.headers['authorization'];
            if (tokenHeader) {
                let token = await tokenHeader.split(' ');
                let decoded = jwt.verify(token[1], this.jwtSecretKey);
                if (decoded) {
                    let user = await userModel.findOne({ uniqueId: decoded?.uniqueId });
                    req.user = user;
                    return next();
                } else {
                    return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, error: 'Session expired.' });
                }
            } else {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, error: 'Authentication token required' });
            }
        } catch (error) {
            console.log('Error occured while verifying JWT Token ' + error);
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ status: HTTP_STATUS.UNAUTHORIZED, error: 'Invalid authentication tocken.' });
        }
    }

}

module.exports = new AuthMiddleware();