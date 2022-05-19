require('dotenv').config()
const _connect_database = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

var con = _connect_database();

exports.createClient = catchAsyncErrors(async (req, res, next) => {

    const { fname, lname, dob, address, telephone } = req.body;

    con.query('SELECT * from client where clientTelephone = ?', [telephone], async function (err, result) {

        if (result.length == 0) {
            
            con.query('INSERT INTO client(firstName,lastName,dateOfBirth,clientAddress,clientTelephone) VALUES (?,?,?,?,?)', [fname, lname, dob, address, telephone], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Client created successfully",
                    clientId: doc.insertId,
                });
            });
        } else {
            return res.status(400).json({
                status: false,
                message: 'Client already exists'
            });
        }
    });
});

exports.getCLientById = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client where client_id = ?', [req.params.id], function (err, doc) {

        if (doc.length == 0) {

            return res.status(400).json({
                status: false,
                message: 'Client does not exist'
            });

        } else {
            res.status(200).json({
                status: true,
                client: doc
            });
        }


    });
});

exports.updateClient = catchAsyncErrors(async (req, res, next) => {

    const { fname, lname, dob, address, telephone } = req.body;

    con.query('SELECT * from client where client_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client does not exist'
            });
        } else {

            con.query('UPDATE client SET firstName = ?,lastName = ?,dateOfBirth = ?,clientAddress = ?,clientTelephone = ? WHERE client_id = ?', [fname, lname, dob, address, telephone, req.params.id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Client updated successfully",
                });
            });
        }
    });
});

exports.deleteClient = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client where client_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client does not exist'
            });
        } else {

            con.query('DELETE FROM client WHERE client_id = ?', [req.params.id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Client deleted successfully",
                });
            });
        }
    });
});

exports.getAllClients = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from client', function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'No clients found'
            });
        } else {
            res.status(200).json({
                status: true,
                clients: result
            });
        }
    });
});