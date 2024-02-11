/**
 * @constant HTTP_STATUS http status codes
 */
const HTTP_STATUS = require('../../constants/http.constants');

/**
 * @constant UserService Service to handle users business logic
 */
const UserService = require('./users.service');

/**
 * @constant CustomError class to handle errors
 */
const CustomError = require('../../error-handlers/custom.error');


class UsersController {
    constructor() {
    }

    /**
     * @method users:saveUser
     * @description adds new user record to the db after successful validation
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @returns successful response when no error occured during save
    */
    async saveUserController(req, res) {
        try {
            const response = await UserService.createNewUser(req.validate);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.CREATED).json({
                message: response.message,
                status: true
            });
        } catch (error) {
            console.log(`Inside UserController: saveUser method: Error occured while saving user ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

    /**
     * @method users:updateUser
     * @description update user record to the db after successful validation
     * @param {*} req express request handler to handle requests
     * @param {*} res express response handler to handle response
     * @returns successful response when no error occured during update
    */
    async updateUser(req, res) {
        try {
            const response = await UserService.updateUserDetails(req.body, req.params.uniqueId);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.OK).json({
                message: response.message,
                status: true
            });
        } catch (error) {
            console.log(`Inside UserController: updateUser method: Error occured while updating user ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

    /**
        * @method users:generateAccessTokenController
        * @description creates access token after successful validation
        * @param {*} req express request handler to handle requests
        * @param {*} res express response handler to handle response
    */
    async generateAccessTokenController(req, res) {
        try {
            const response = await UserService.generateTokenService(req.validate);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.OK).json({
                status: true,
                message: response.message,
                authToken: response.authToken,
            });
        } catch (error) {
            console.log(`Inside UserController: generateAccessTokenController method: Error while creating access token: ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

    /**
        * @method users:getAllUsers
    */
    async getAllUsers(req, res) {
        try {
            const response = await UserService.getAllUsers();
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.OK).json({
                status: true,
                message: response.message,
                data: response.data,
            });
        } catch (error) {
            console.log(`Inside UserController: getAllUsers method: Error while fetching users: ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

    async getUserByIdController(req, res) {
        try {
            const response = await UserService.getUserById(req.params.uniqueId);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.OK).json({
                status: true,
                message: response.message,
                data: response.data,
            });
        } catch (error) {
            console.log(`Inside UserController: getUserByIdController method: Error while fetching user: ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

    async deleteUserController(req, res) {
        try {
            const response = await UserService.deleteUser(req.params.uniqueId, req.user);
            if (!response) throw new CustomError('Error! Please try after some time.', HTTP_STATUS.INTERNAL_SERVER_ERROR);

            return res.status(HTTP_STATUS.OK).json({
                message: response.message,
                status: true
            });
        } catch (error) {
            console.log(`Inside UserController: updateUser method: Error occured while updating user ${error}`);
            if (error instanceof CustomError)
                return res.status(error.statusCode).json({
                    status: false,
                    message: error.message || this.error
                });

            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                status: false,
                message: this.error
            });
        }
    }

};


module.exports = new UsersController();
