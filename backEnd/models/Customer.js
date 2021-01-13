const { required } = require('joi');
const joi = require('joi');
const { Schema, mongoose } = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    user:{
         type: Schema.Types.ObjectId, // Customer: id:1 userId 2
         ref: "user"
    },
    name:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true

    },
    phone:{
        type: String,
        required: true

    },
    adress:{
        type:[
   {
       street: {
           type: String,
           required: true

       },
       number:{
           type: Number,
           required: true,
           min: 0,

       },
       location:{
            type: String,
            required: true 
       }
   }

        ]
    }

});
const validateCustomer = {
    customer : joi.object.keys({
        _id: joi.ObjectId(),
        name: joi.string().min(4).max(20).required(),
        lastName: joi.string().min(4).max(20).required(),
        phone: joi.string().min(4).max(20).required(),
    }),
    adress: joi.object.keys({
        _id: joi.ObjectId(),
        street: joi.string().min(4).max(20).required(),
        number: joi.string().min(4).max(20).required(),
        location: joi.string().min(4).max(20).required(),
    })

}
exports.validateCustomer = validateCustomer;
module.exports = mongoose.model("customer", customerSchema );
