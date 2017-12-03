const passportJwt = require('passport-jwt')

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = 'supersecretsecret'

// JWT Login Strategy for Users
const strategy = new JwtStrategy(opts, (payload, done) => {
  User.findOne({ email: payload.email }, (err, user) => {
    if (err) {
      return done(err, false)
    }
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  })
})

module.exports = strategy
