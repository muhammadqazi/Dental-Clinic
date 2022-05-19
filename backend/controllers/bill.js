require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const con = require("../config/db");
const responseHanlder = require('../utils/responseHanlder');


exports.createBill = catchAsyncErrors(async (req, res, next) => {

    const { billDate, total, paymentMethod, appointment_id, client_id } = req.body;

    con.query('SELECT * FROM appointment where appointment_id = ?;SELECT * FROM client where client_id = ?', [appointment_id, client_id], async function (err, result) {
        if (result[0].length == 0) {

            responseHanlder(res, 400, false, 'Appointment with this id does not exist');

        } else if (result[1].length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            con.query('INSERT INTO bill(billDate,total,paymentMethod,appointment_id,client_id) VALUES (?,?,?,?,?)', [billDate, total, paymentMethod, appointment_id, client_id], function (err, doc) {
                if (err) throw err;

                responseHanlder(res, 200, true, "Bill created successfully", undefined, doc.insertId);
            });
        }
    });

});

exports.getBillByClientId = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {
            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {

                    responseHanlder(res, 400, false, 'Bill for this client does not exist');
                } else {

                    responseHanlder(res, 200, true, undefined, result);
                }
            });
        }
    });
});

exports.updateBill = catchAsyncErrors(async (req, res, next) => {

    const { billDate, total, paymentMethod, appointment_id } = req.body;

    con.query('SELECT * FROM appointment where appointment_id = ?;SELECT * FROM client where client_id = ?', [appointment_id, req.params.id], async function (err, result) {
        if (result[0].length == 0) {

            responseHanlder(res, 400, false, 'Appointment with this id does not exist');

        } else if (result[1].length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], async function (err, bill) {
                if (bill.length == 0) {

                    responseHanlder(res, 400, false, 'Bill for this client does not exist');

                } else {

                    con.query('UPDATE bill SET billDate = ?,total = ?,paymentMethod = ?,appointment_id = ? WHERE client_id = ?', [billDate, total, paymentMethod, appointment_id, req.params.id], function (err, doc) {
                        if (err) throw err;

                        responseHanlder(res, 200, true, "Bill updated successfully");
                    });
                }
            });
        }
    });
});


exports.deleteBill = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {
            con.query('SELECT * FROM bill where client_id = ?', [req.params.id], function (err, result) {
                if (result.length == 0) {

                    responseHanlder(res, 400, false, 'Bill for this client does not exist');

                } else {
                    con.query('DELETE FROM bill WHERE client_id = ?', [req.params.id], function (err, doc) {
                        if (err) throw err;

                        responseHanlder(res, 200, true, "Bill deleted successfully");
                    });
                }
            });
        }
    });
});