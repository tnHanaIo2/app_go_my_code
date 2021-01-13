const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require ("joi");
const bcrypt = require("bcrypt"); // bcrypt is faster than bcrypt js
const jwt = require("jsonwebtoken");
require ("dotenv").config({ path: "../config/.env"});

const userSchema = new Schema ({
    email:{
        type: String,
        required: true,
        unique: true

    },
    password:{
        type: String,
        required: true

    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        default: "user"
    },
    date:{
        type: Date,
        default: Date.now
    }
});

/*
This is the middleware, It will be called before saving any record
*/
// userSchema.pre("save", async function(next) {
// try {
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashPassword;
//     next;
// } catch (error) {
//     next(error);
// }
// })
// /*Compare passwod*/
// userSchema.methods.isValidPassword = async function(newPassword) {
//     try {
//         return await bcrypt.compare(newPassword, this.password) ;
//     } catch (error) {
//         throw new Error(error);
//     }
// }

// /**
//  * Generation Token
//  */
// userSchema.methods.generateAuthToken = async function(){
//     try {
//         return await jwt.sign(
//             {
//              _id : this._id,
//              isAdmin : this.isAdmin,
//              role: this.role,
//              iat: new Date().getTime(),
//              exp: new Date().setDate(new Date().getTime() + 1 )
//         },
//         process.env.JWT_SECRET
//         )
        
//     } catch (error) {
//         throw new Error(error)
//     }
// }

  const validateUser = {
      register: Joi.object().keys({
          email: Joi.string().min(8).max(100).required().email(),
          password: Joi.string().min(6).max(100).required(),
          confirmPAssword : Joi.string().min(6).max(100).required()
      }),
      login: Joi.object().keys({
          email: Joi.string().min(8).max(100).required(),
          password: Joi.string().min(6).max(100).required(),

      })
  }
  const User =  mongoose.model("User", userSchema);
 
exports.validateUser = validateUser; 

exports.User = User;
