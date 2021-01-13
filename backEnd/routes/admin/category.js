const express = require ("express");
const { createOrUpdateCategory, deleteCategory } = require("../../controllers/categoryController");
const { validateBody, validateParamId, schemas} = require("../../middelwares/validator");
const { validateCategory } = require("../../models/Category");
const router = express.Router()


router.post("/",  createOrUpdateCategory);
//[validateBody(validateCategory.category)],
router.delete("/:id", deleteCategory)
//[validateParamId(schemas.id)], 
module.exports = router;

