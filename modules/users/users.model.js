/**
 * @constant mongoose orm library for mongodb database
*/
const mongoose = require('mongoose');

/**
 * @constant Joi data validation library
*/
const Joi = require('joi');

const { v4: uuidv4 } = require('uuid');

/**
 * @constant userSchema schema for user module
*/
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    mobileNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    uniqueId: { // Generating another uniqueid to overcome the expousre of the mongodb _id's (Security purpose)
        type: String,
        default: () => uuidv4(),
    },
    isAdmin: { // user who has isAdmin as true will only able to delete the documents
        type: Boolean,
        default: false
    },
    description: {
        type: String
    }


}, { timestamps: true });

const userModel = mongoose.model('user_profiles', userSchema);

/** user schema for sign-up validation with joi*/
/**
 * @constant userSchemaValidator validation for user modulue will be used in users middleware
*/
const userSchemaValidator = Joi.object({
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    mobileNumber: Joi.string().regex(/^\d{10}$/).required(),
    isAdmin: Joi.boolean(),
    description: Joi.string()
});


/**
 * @constant updateUserSchemaValidator validation for user modulue will be used in users middleware
*/
const updateUserSchemaValidator = Joi.object({
    fullName: Joi.string(),
    email: Joi.string().email(),
    mobileNumber: Joi.string().regex(/^\d{10}$/),
    isAdmin: Joi.boolean(),
    description: Joi.string()
});

/** generate access token schema validation with joi*/
/**
 * @constant generateAccessTokenValidator validation for genrating access token
*/
const generateAccessTokenValidator = Joi.string().regex(/^\d{10}$/);

module.exports = {
    userModel,
    userSchemaValidator,
    updateUserSchemaValidator,
    generateAccessTokenValidator,
};
