const express = require("express");
const {
    createBill,
    getBillByClientId,
    updateBill,
    deleteBill
} = require("../controllers/bill");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();

router.route("/bill/new").post(isAuthenticatedUser, createBill);

router.route("/bill/:id")
    .get(isAuthenticatedUser, getBillByClientId)
    .put(isAuthenticatedUser, updateBill)
    .delete(isAuthenticatedUser , deleteBill)


module.exports = router;
