const express = require("express");

const {
    createUser,
    loginUser,
    forgotPassword,
    codeVerification
} = require('../controllers/user');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/user/new").post(isAuthenticatedUser, createUser);

router.route("/user/password/forget").post(forgotPassword);

router.route("/user/verify/code").post(codeVerification);

router.route("/user/login").post(loginUser);




module.exports = router;
