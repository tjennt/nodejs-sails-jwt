const jwt = require('jsonwebtoken');

module.exports = {

    currentUser: null,

    /**
     * generate a new token
     * @param payload
     * @returns {*}
     */
    generateToken: function (payload) {
        return jwt.sign(
            payload,
            sails.config.app.auth.token_secret,
            {
                expiresIn: sails.config.app.auth.token_expiration
            }
        );
    },

    /**
     * check token is valid
     * @param token
     * @param callback
     * @returns {*}
     */
    verifyToken: function (token, callback) {
        return jwt.verify(
            token,
            sails.config.app.auth.token_secret,
            {},
            callback
        )
    }
};