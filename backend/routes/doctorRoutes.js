const express = require("express");

const {
    createDoctor, 
    getAllDocs,
    getOneDoc,
    updateDoctor,
    deleteDoctor
} = require("../controllers/doctor");


const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/doc/new").post(isAuthenticatedUser, createDoctor);

router.route("/doc/get/all").get(isAuthenticatedUser , getAllDocs);

router.route("/doc/:id")
        .get(isAuthenticatedUser , getOneDoc)
        .put(isAuthenticatedUser , updateDoctor)
        .delete(isAuthenticatedUser , deleteDoctor);


module.exports = router;
