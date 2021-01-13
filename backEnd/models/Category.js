const { boolean } = require('joi');
const Joi = require ('joi');
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
Joi.objectId = require('joi-objectid')(Joi);


const categorySchema = new Schema ({
    name:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    isAvailable:{
        type:Boolean,
        default : true,
    },
    date:{
        type: Date,
        default: Date.now
    },
});

const validateCategory = {
    category: Joi.object().keys({
        _id: Joi.objectId(),
        name:Joi.string().min(10).max(30).required(),
        description:Joi.string().min(10).max(300).required(),
        isAvailable:Joi.boolean().required(),
    })
}

const Category = new mongoose.model("category", categorySchema);
exports.Category = Category;
exports.validateCategory = validateCategory