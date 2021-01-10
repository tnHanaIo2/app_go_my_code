const {body, validationResult} = require ('express-validator')

const registerRules = () => [

    body("name","Name is required").notEmpty(),
    body("lastName", "lastName is required").notEmpty(),
    body("email", "Email must respect the Regex").isEmail(),
    body("password","Password must contain minimum 6 caracters").isLength({min:6, max:20})
];

const loginRules = () => [
     body("email","Email is invalid").isEmail(),
     body("password","Password must contain 6 caracters").isLength({
         min:6,
         max:20
     })
];
const validator = (req, res, next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json(customError(errors.array()))
    }
    else next();
}

const customError = (errorsArray) => 
       errorsArray.map((err) => ({msg: err.msg}));


module.exports = {
    registerRules, 
    validator,
    loginRules
}