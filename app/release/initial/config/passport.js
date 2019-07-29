const jwtStrategy = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const globals = require('./globals');

module.exports = (passport) => {
    var opts = {};
    opts.FromRequest = extractJWT.fromAuthHeader();
    opts.secretKey = globals.secret;

    passport.use(new jwtStrategy(opts, (jwtPayloads,done) => {
        User.findOne({id: jwtPayloads.id}, (err,user) => {
            if (err) done(err, false);
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
    }))
}
