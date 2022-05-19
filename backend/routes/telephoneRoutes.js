const express = require("express");

const {
    createTelephone,
    getTelephoneByClientId,
    getTelephoneByNumber,
    updateTelephone,
    deleteTelephone
} = require("../controllers/telephone");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/tel/new").post(isAuthenticatedUser, createTelephone);

router.route("/tel/num/:tel").get(isAuthenticatedUser, getTelephoneByNumber);

router.route("/tel/:id")
    .get(isAuthenticatedUser, getTelephoneByClientId)
    .put(isAuthenticatedUser, updateTelephone)
    .delete(isAuthenticatedUser, deleteTelephone);

module.exports = router;
