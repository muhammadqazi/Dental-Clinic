require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const _connect_database = require("../config/db");


var con = _connect_database();


exports.createBill = catchAsyncErrors(async (req, res, next) => {

    const { billDate, total, paymentMethod, appointment_id, client_id } = req.body;

    con.query('SELECT * FROM appointment where appointment_id = ?;SELECT * FROM client where client_id = ?', [appointment_id, client_id], async function (err, result) {
        console.log(result);
        if (result[0].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Appointment with this id does not exist'
            });
        } else if (result[1].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {

            con.query('INSERT INTO bill(billDate,total,paymentMethod,appointment_id,client_id) VALUES (?,?,?,?,?)', [billDate, total, paymentMethod, appointment_id, client_id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Bill created successfully",
                    billId: doc.insertId,
                });
            });
        }
    });

});

exports.getBillByClientId = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {
            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {
                    res.status(400).json({
                        status: false,
                        message: 'Bill for this client does not exist'
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        bill: result,
                    });
                }
            });
        }
    });
});

exports.updateBill = catchAsyncErrors(async (req, res, next) => {

    const { billDate, total, paymentMethod, appointment_id } = req.body;

    con.query('SELECT * FROM appointment where appointment_id = ?;SELECT * FROM client where client_id = ?', [appointment_id, req.params.id], async function (err, result) {
        console.log(result);
        if (result[0].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Appointment with this id does not exist'
            });
        } else if (result[1].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {

            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], async function (err, bill) {
                if (bill.length == 0) {
                    return res.status(400).json({
                        status: false,
                        message: 'Bill for this client does not exist'
                    });
                } else {

                    con.query('UPDATE bill SET billDate = ?,total = ?,paymentMethod = ?,appointment_id = ? WHERE client_id = ?', [billDate, total, paymentMethod, appointment_id, req.params.id], function (err, doc) {
                        if (err) throw err;

                        res.status(200).json({
                            status: true,
                            message: "Bill updated successfully",
                        });
                    });
                }
            });
        }
    });
});


exports.deleteBill = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {
            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], function (err, result) {
                if (result.length == 0) {
                    res.status(400).json({
                        status: false,
                        message: 'Bill for this client does not exist'
                    });
                } else {
                    con.query('DELETE FROM bill WHERE client_id = ?', [req.params.id], function (err, doc) {
                        if (err) throw err;

                        res.status(200).json({
                            status: true,
                            message: "Bill deleted successfully",
                        });
                    });
                }
            });
        }
    });
});