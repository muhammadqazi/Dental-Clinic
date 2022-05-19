require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const con = require("../config/db");


exports.createTelephone = catchAsyncErrors(async (req, res, next) => {

    const { TelfNo, client_id } = req.body;

    con.query('SELECT * FROM client where client_id = ?', [client_id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {

            con.query('INSERT INTO telephone(TelfNo,client_id) VALUES (?,?)', [TelfNo, client_id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Telephone created successfully",
                    telephoneId: doc.insertId,
                });
            });
        }
    });
});

exports.getTelephoneByClientId = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {
            con.query('SELECT * FROM telephone where client_id = ?', [req.params.id], function (err, result) {

                if (result.length == 0) {
                    res.status(400).json({
                        status: false,
                        message: 'Telephone for this client does not exist'
                    });
                } else {
                    res.status(200).json({
                        status: true,
                        telephone: result,
                    });
                }
            });
        }
    });
});

exports.getTelephoneByNumber = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM telephone where TelfNo = ?', [req.params.tel], function (err, result) {

        if (result.length == 0) {
            res.status(400).json({
                status: false,
                message: 'Telephone with this number does not exist'
            });
        } else {
            let data = [];
            con.query('SELECT * FROM client where client_id = ?', [result[0].client_id], function (err, client) {

                res.status(200).json({
                    status: true,
                    telephone: result[0].TelfNo,
                    client: {
                        client_id: client[0].client_id,
                        firstName: client[0].firstName,
                        lastName: client[0].lastName,
                        dateOfBirth: client[0].dateOfBirth,
                        clientAddress: client[0].clientAddress,
                    }
                });

            });
        }
    });
});

exports.updateTelephone = catchAsyncErrors(async (req, res, next) => {

    const { TelfNo } = req.body;

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {
            con.query('SELECT * FROM telephone where client_id = ?', [req.params.id], function (err, result) {
                if (result.length == 0) {
                    return res.status(400).json({
                        status: false,
                        message: 'Telephone for this client does not exist'
                    });
                } else {

                    con.query('UPDATE telephone SET TelfNo = ? WHERE client_id = ?', [TelfNo, req.params.id], function (err, doc) {
                        if (err) throw err;

                        res.status(200).json({
                            status: true,
                            message: "Telephone updated successfully",
                        });
                    });
                }
            });
        }
    });
});

exports.deleteTelephone = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {
            con.query('SELECT * FROM telephone where client_id = ?', [req.params.id], function (err, result) {
                if (result.length == 0) {
                    return res.status(400).json({
                        status: false,
                        message: 'Telephone for this client does not exist'
                    });
                } else {

                    con.query('DELETE FROM telephone WHERE client_id = ?', [req.params.id], function (err, doc) {
                        if (err) throw err;

                        res.status(200).json({
                            status: true,
                            message: "Telephone deleted successfully",
                        });
                    });
                }
            });
        }
    });
});