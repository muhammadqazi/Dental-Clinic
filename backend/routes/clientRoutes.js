const express = require("express");
const {
    createClient,
    updateClient,
    getCLientById,
    deleteClient,
    getAllClients
} = require("../controllers/client");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/client/new").post(isAuthenticatedUser, createClient);

router.route("/client/:id")
    .get(isAuthenticatedUser, getCLientById)
    .put(isAuthenticatedUser, updateClient)
    .delete(isAuthenticatedUser, deleteClient);

router.route("/client/get/all").get(isAuthenticatedUser, getAllClients);



module.exports = router;
