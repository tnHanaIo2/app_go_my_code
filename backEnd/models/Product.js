const { string, required, boolean } = require("joi");
const Joi = require ("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema ({
     name:{
         type:String,
         required:true
     },
     category:{
          type: categorySchema,
          required:true  
     },
     price:{
         type: Number,
         required:true
     },
     description:{
         type: Number,
         required: true
     },
     discount:{
         type: Number,
         required: true,
         min:0,
     },
     stock:{
         type: Number,
         required: true,
         min:0,
     },
     image:{
         type:String,
         default: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
         required: true 
     },
     isAvailable:{
         type:boolean,
         default: true,
     },
     date:{
         type: Date(),
         default: Date.now  
     }

});
const validateProduct = {
  product: Joi.Object.keys({
      _id: Joi.objectId().required(),
      name: Joi.string().min(10).max(30).required(),
      description: Joi.string().min(10).max(150).required(),
      image: Joi.string().required(),
      price: Joi.number().min(0).required(),
      discount: Joi.number().min(0).required(),
      stock: Joi.number().min(0).required(),
      isAvailable: Joi.boolean(),
      categoryId: Joi.objectId().required(),
  })
},
const Product = new mongoose.model("product", productSchema);
exports.Product = Product;
exports.validateProduct = validateProduct; 