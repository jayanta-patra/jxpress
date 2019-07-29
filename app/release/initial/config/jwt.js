const jwt = require('jsonwebtoken');
var argv = require('minimist')(process.argv.slice(2));
const globals = require('./globals');

module.exports = (payload) => {
    return jwt.sign(
        payload,
        globals.secret.JWT_PRIVATE,
        {
            expiresIn: "1h"
        }
    )
}