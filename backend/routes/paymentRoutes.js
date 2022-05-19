const express = require("express");
const {
    createPayment,
    getPaymentByClientId,
    updatePayment,
    deletePayment,
    getPaymentByBillId
} = require("../controllers/payment");



const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");


const router = express.Router();


router.route("/pay/new").post(isAuthenticatedUser, createPayment);

router.route("/pay/bill/:id").get(isAuthenticatedUser, getPaymentByBillId);

router.route("/pay/:id")
    .get(isAuthenticatedUser, getPaymentByClientId)
    .put(isAuthenticatedUser, updatePayment)
    .delete(isAuthenticatedUser, deletePayment);

module.exports = router;
