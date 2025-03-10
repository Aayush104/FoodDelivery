const {registerUser} = require("../Controller/authController");

const router = require("express").Router()
router.route("/register").post(registerUser)

module.exports = router