/**
 * @constant CustomError class to handle errors
 */
const CustomError = require('../../error-handlers/custom.error');

/**
 * @constant HTTP_STATUS http status codes
 */
const HTTP_STATUS = require('../../constants/http.constants');

const { userModel } = require('./users.model');

const helperUtil = require('../../helper.util');


class UserService {
    constructor() {
    }

    /**
     * @method users:createNewUserAccount
     * @description adds new user record to the db after successful validation
     * @returns successful response when no error occured during creating new user account
    */
    async createNewUser(user) {
        try {
            await new userModel(user).save();

            return {
                message: 'User created succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while creating new user account: ${error.message}`);
            if (error && error?.code === 11000) throw new CustomError('User already exists with given mobile number', HTTP_STATUS.DUPLICATE);
            else throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async generateTokenService(mobileNumber) {
        try {
            let user = await userModel.findOne({ mobileNumber: mobileNumber }, { _id: 0 });
            if (!user) throw new CustomError('User not found to genearate access token', HTTP_STATUS.NOT_FOUND);
            let serializedUser = JSON.parse(JSON.stringify(user));


            return {
                message: 'token generated succesfully',
                authToken: await helperUtil.jwt(serializedUser),
                status: true,
            };

        } catch (error) {
            console.log(`Error while creating user access token: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async getAllUsers() {
        try {
            const users = await userModel.find({}, { _id: 0 });

            return {
                message: 'Users fetched succesfully',
                data: users,
                status: true,
            };

        } catch (error) {
            console.log(`Error while fetching users: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }


    async getUserById(uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to fetch the details', HTTP_STATUS.NOT_FOUND);

            return {
                message: 'User fetched succesfully',
                data: user,
                status: true,
            };

        } catch (error) {
            console.log(`Error while fetching users: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

    async updateUserDetails(userReqObj, uniqueId) {
        try {
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to update the details', HTTP_STATUS.NOT_FOUND);
            await userModel.updateOne({ uniqueId: uniqueId }, userReqObj)

            return {
                message: 'User updated succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while creating new user account: ${error.message}`);
            if (error && error?.code === 11000) throw new CustomError('User already exists with given mobile number', HTTP_STATUS.DUPLICATE);
            else throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }


    async deleteUser(uniqueId, loggedInUser) {
        try {
            if (!loggedInUser?.isAdmin) throw new CustomError('User doesnt have admin access to delete', HTTP_STATUS.FORBIDDEN);
            const user = await userModel.findOne({ uniqueId: uniqueId }, { _id: 0 });
            if (!user) throw new CustomError('User not found to delete', HTTP_STATUS.NOT_FOUND);
            await userModel.deleteOne({ uniqueId: uniqueId });

            return {
                message: 'User deleted succesfully',
                status: true,
            };

        } catch (error) {
            console.log(`Error while deleting user: ${error.message}`);
            throw new CustomError((error instanceof CustomError) ? error.message : 'Error! Please try again.', error.statusCode);
        }
    }

}

module.exports = new UserService();		