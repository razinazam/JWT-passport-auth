const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require("./Models/RegisterSchema")

const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');

opts.secretOrKey = 'config';


module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log('jwt', jwt_payload)
        User.findOne({ _id: jwt_payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                let newUser = {
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
                return done(null, newUser);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
}