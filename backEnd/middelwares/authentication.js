// C'est un middlware qui sécurise tout les endpoint dans not projet si auth alors il tu es accesseibe
//alternative passeport.js
const jwt = require ('jsonwebtoken');
const User = require('../models/User');

const isAuth = async(req, res, next) => {

    const token = req.headers.authorization; 


    try {
        const decoded = jwt.verify(token, process.env.SECRET); 
        console.log({decoded});

        let user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(401).send([{msg: "Unauthorized"}]);
        }

        req.user = user;
    } catch (error) {
        console.log(error);
    }

    next();
} ;

module.exports = isAuth;