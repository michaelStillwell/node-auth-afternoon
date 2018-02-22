const
    Auth0Strategy = require('passport-auth0')
    config      = require('./config');

module.exports = new Auth0Strategy ({
    domain: config.domain,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: '/login'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
})