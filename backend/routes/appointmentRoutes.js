const express = require("express");
const {
    createAppointment, 
    listByDocId,
    listByClientId,
    listByTreatId,
    updateAppointment
} = require("../controllers/appointment");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/appoint/new").post(isAuthenticatedUser, createAppointment);

router.route("/appoint/byDoc/:id").get(isAuthenticatedUser, listByDocId);

router.route("/appoint/byClient/:id").get(isAuthenticatedUser, listByClientId);

router.route("/appoint/byTreat/:id").get(isAuthenticatedUser, listByTreatId);

router.route("/appoint/:id/:date/:time").put(isAuthenticatedUser, updateAppointment);

module.exports = router;