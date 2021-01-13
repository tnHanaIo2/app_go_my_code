const asyncMiddelware = require ("../middelwares/async");
const { Category } = require("../models/Category");
const ObjectId = require("mongoose").Types.ObjectId;


module.exports = {
    createOrUpdateCategory : asyncMiddelware(async (req, res) => {
        const categoryFields= {};
        const {name, description, isAvailable} = req.body
        const _id = req.body._id || undefined

        if(name) categoryFields.name = name;
        if (description ) categoryFields.description = description;
        if (isAvailable) categoryFields.isAvailable = isAvailable;
        
        //Add Category
        const newCategory = await new Category(categoryFields).save();
         res.json(newCategory);
        
        //Update Categ

        const category = await Category.findById(_id);
        if(category){
            const updateCategory= await Category.findByIdAndUpdate(
                {_id} ,
                {$set : categoryFields},
                {new: true}
             );
             return res.json(updateCategory);
        }
    }  ),
    deleteCategory : asyncMiddelware(async (req, res) =>{
        const errors = {};
        const _id =  req.value.params;
        console.log("Here _id", _id)
        const category = Category.findByIdAndRemove(_id);  
        console.log("Here category", category)
        if(! category){
            errors.notFound="Category Not Found"
            return res.status(404).json(errors)
        }
        return res.status(200).json({success : true});
    })

}