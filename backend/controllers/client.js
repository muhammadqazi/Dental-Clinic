require('dotenv').config()
const con = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const responseHanlder = require('../utils/responseHanlder');

exports.createClient = catchAsyncErrors(async (req, res, next) => {

    const { fname, lname, dob, address, telephone } = req.body;

    con.query('SELECT * from client where clientTelephone = ?', [telephone], async function (err, result) {

        if (result.length == 0) {

            con.query('INSERT INTO client(firstName,lastName,dateOfBirth,clientAddress,clientTelephone) VALUES (?,?,?,?,?)', [fname, lname, dob, address, telephone], function (err, doc) {
                if (err) throw err;

                responseHanlder(res, 200, true, 'Client created successfully', undefined, doc.insertId);
            });
        } else {

            responseHanlder(res, 400, false, 'Client with this telephone already exists');
        }
    });
});

exports.getCLientById = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client where client_id = ?', [req.params.id], function (err, doc) {

        if (doc.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            responseHanlder(res, 200, true, undefined, doc);
        }


    });
});

exports.updateClient = catchAsyncErrors(async (req, res, next) => {

    const { fname, lname, dob, address, telephone } = req.body;

    con.query('SELECT * from client where client_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            con.query('UPDATE client SET firstName = ?,lastName = ?,dateOfBirth = ?,clientAddress = ?,clientTelephone = ? WHERE client_id = ?', [fname, lname, dob, address, telephone, req.params.id], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Client updated successfully');
            });
        }
    });
});

exports.deleteClient = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client where client_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            con.query('DELETE FROM client WHERE client_id = ?', [req.params.id], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Client deleted successfully');
            });
        }
    });
});

exports.getAllClients = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client', function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'No clients found');

        } else {

            responseHanlder(res, 200, true, undefined, result);
        }
    });
});