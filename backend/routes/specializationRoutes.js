const express = require("express");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/spec/new").post(isAuthenticatedUser);


module.exports = router;
