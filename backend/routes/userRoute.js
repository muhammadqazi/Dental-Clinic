const express = require("express");

const {
    createUser,
    loginUser,
    forgotPassword,
    codeVerification,
    newPassword,
    getUserByEmail,
    getUserById,
    updateUser,
    deleteUser,
    getAllUsers,
} = require('../controllers/user');
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/user/new").post(isAuthenticatedUser, createUser);

router.route("/user/password/forget").post(forgotPassword);

router.route("/user/verify/code").post(isAuthenticatedUser, codeVerification);

router.route("/user/password/new").post(isAuthenticatedUser, newPassword);

router.route("/user/get/email").post(isAuthenticatedUser, getUserByEmail);

router.route("/user/get/all").get(isAuthenticatedUser, getAllUsers);

router.route("/user/:id")
    .get(isAuthenticatedUser, getUserById)
    .put(isAuthenticatedUser, updateUser)
    .delete(isAuthenticatedUser, deleteUser);

router.route("/user/login").post(loginUser);


module.exports = router;
