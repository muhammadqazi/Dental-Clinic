const express = require("express");
const {
    createTreatment,
    getTreatmentByDocId,
    updateTreatment,
    deleteTreatment
} = require("../controllers/treatment");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/treat/new").post(isAuthenticatedUser, createTreatment);

router.route("/treat/doc/:id")
    .get(isAuthenticatedUser, getTreatmentByDocId)

router.route("/treat/doc/:id/:treatmentId")
    .put(isAuthenticatedUser, updateTreatment)
    .delete(isAuthenticatedUser, deleteTreatment);

module.exports = router;
