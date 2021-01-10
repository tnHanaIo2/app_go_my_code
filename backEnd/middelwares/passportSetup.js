const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require ('passport');
const User = require('../models/User');

const opts = {
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.SECRET
}

// Le middleware du passport
 passport.use(new JwtStrategy(opts, async(decoded, done) => {
     try {
       const user = await  User.findById(decoded.userId).select("-password");
       if(!user){
           done(null, false);
       }   
           done(null, user); // req.user = user
     } catch (error) {
         done(error, false);
     }
 })
 );
 module.exports = isAuth2 = () => passport.authenticate("jwt",{session: false});