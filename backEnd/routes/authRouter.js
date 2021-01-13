const express = require("express");
const router = express.Router();
const { register, login, authaurisation } = require("../controllers/authController");
const { registerRules, validator, loginRules } = require("../middelwares/validator");
const isAuth2 = require("../middelwares/passportSetup") ;
/**
 * @params POST /api/auth/register
 * @description Register a user
 * @access PUBLIC
 */
router.post("/register", registerRules(),validator, register)

/**
 * @params POST /api/auth/login
 * @description Login a user
 * @access PUBLIC
 */
router.post("/login", loginRules(),validator, login)

/**
 * @params GET /api/auth/authUser
 * @description get user logged
 * @access PRIVATE
 */
router.get("/authUser", isAuth2(), authaurisation)

module.exports = router;