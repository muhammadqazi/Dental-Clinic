require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const con = require("../config/db");
const responseHanlder = require('../utils/responseHanlder');


exports.createPayment = catchAsyncErrors(async (req, res, next) => {

    const { total, payDate, paymentMethod, client_id, bill_id } = req.body;

    con.query('SELECT * FROM client where client_id = ?;SELECT * FROM bill where bill_id = ?', [client_id, bill_id], function (err, result) {
        if (result[0].length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else if (result[1].length == 0) {

            responseHanlder(res, 400, false, 'Bill with this id does not exist');

        } else {

            con.query('INSERT INTO payment(total,payDate,paymentMethod,client_id,bill_id) VALUES (?,?,?,?,?)', [total, payDate, paymentMethod, client_id, bill_id], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Payment created sucessfully', undefined, doc.insertId);
            });
        }
    });
});

exports.getPaymentByClientId = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {
            con.query('SELECT * FROM payment where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {

                    responseHanlder(res, 400, false, 'Payment for this client does not exist');
                } else {

                    responseHanlder(res, 200, true, undefined, result);
                }
            });
        }
    });
});

exports.getPaymentByBillId = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM bill where bill_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Bill with this id does not exist');
        } else {
            con.query('SELECT * FROM payment where bill_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {

                    responseHanlder(res, 400, false, 'Payment for this bill does not exist');
                } else {

                    responseHanlder(res, 200, true, undefined, result);
                }
            });
        }
    });
});

exports.updatePayment = catchAsyncErrors(async (req, res, next) => {
    const { total, payDate, paymentMethod, bill_id } = req.body;

    con.query('SELECT * FROM client where client_id = ?;SELECT * FROM bill where bill_id = ?', [req.params.id, bill_id], function (err, result) {
        if (result[0].length == 0) {
            
            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else if (result[1].length == 0) {
            
            responseHanlder(res, 400, false, 'Bill with this id does not exist');

        } else {
            con.query('SELECT * FROM payment where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {
                    
                    responseHanlder(res, 400, false, 'Payment for this client does not exist');
                } else {
                    con.query('UPDATE payment SET total = ?, payDate = ?, paymentMethod = ?, bill_id = ? WHERE client_id = ?', [total, payDate, paymentMethod, bill_id, req.params.id], function (err, doc) {
                        if (err) throw err;

                        
                        responseHanlder(res, 200, true, 'Payment updated sucessfully');
                    });
                }
            });
        }
    });
});


exports.deletePayment = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            
            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {
            con.query('SELECT * FROM payment where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {
                    
                    responseHanlder(res, 400, false, 'Payment for this client does not exist');
                } else {
                    con.query('DELETE FROM payment WHERE client_id = ?', [req.params.id], function (err, doc) {
                        if (doc.length == 0) {
                            
                            responseHanlder(res, 400, false, 'Payment for this client does not exist');
                        } else {
                            
                            responseHanlder(res, 200, true, 'Payment deleted sucessfully');
                        }
                    });
                }
            });
        }
    });
});