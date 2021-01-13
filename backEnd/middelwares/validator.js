// const Joi = require("joi");
// Joi.objectId = require("joi-objectid")(Joi);

// module.exports = {
//   validateBody: schema => {
//     return (req, res, next) => {
//       const { error, value } = schema.validate(req.body, schema)
//       if (error) {
//         return res.status(400).json(error.details[0].message);
//       }

//       if (!req.value) {
//         req.value = {};
//       }
//       req.value["body"] = value;
//       next();
//     };
//   },
//   validateParamId: schema => {
//     return (req, res, next) => {
//       const { error, value } = Joi.validate(req.params.id.toString(), schema);

//       if (error) {
//         return res.status(400).json(error.details[0].message);
//       }

//       if (!req.value) {
//         req.value = {};
//       }
//       req.value["params"] = value;
//       next();
//     };
//   },
//   schemas: {
//     id: Joi.objectId().required()
//   }
// };
const {body, validationResult} = require ('express-validator')

const registerRules = () => [

    //body("name","Name is required").notEmpty(),
   // body("lastName", "lastName is required").notEmpty(),
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