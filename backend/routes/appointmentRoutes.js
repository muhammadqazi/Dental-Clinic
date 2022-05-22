const express = require("express");
const {
    createAppointment,
    listByDocId,
    listByClientId,
    listByTreatId,
    updateAppointment,
    listAllAppoint,
} = require("../controllers/appointment");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/appoint/new").post(isAuthenticatedUser, createAppointment);

router.route("/appoint/all").get(isAuthenticatedUser, listAllAppoint);

router.route("/appoint/byDoc/:id").get(isAuthenticatedUser, listByDocId);

router.route("/appoint/byTreat/:id").get(isAuthenticatedUser, listByTreatId);

router.route("/appoint/:id")
    .put(isAuthenticatedUser, updateAppointment)
    .get(isAuthenticatedUser, listByClientId)
    
module.exports = router;
