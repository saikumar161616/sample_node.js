/**
 * @constant jwt library to generate jwt token
 */
const JWT = require('jsonwebtoken');


class helperUtilities {
    constructor() {
        this.jwtSecretKey = 'S&7tZ5fT^x@K#E!Y';
        this.expiresIn = { expiresIn: '2h' };
    }

    /**
     * @method jwt to generate token
     * @description generate jwt token 
     * @param {*} data to be passed for token
     * @returns jwt token
    */
    async jwt(data, tokenValidFor = this.expiresIn) {
        return JWT.sign(data, this.jwtSecretKey, tokenValidFor);
    }

}

module.exports = new helperUtilities();