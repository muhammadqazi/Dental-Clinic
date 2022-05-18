require('dotenv').config()
const bcrypt = require('bcryptjs');
const _connect_database = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

var con = _connect_database();


exports.createDoctor = catchAsyncErrors(async (req, res, next) => {

    const { name, address, telephone, password } = req.body;


    con.query('SELECT * from doctor where doc_telephone = ?', [telephone], async function (err, result) {
        if (result.length == 0) {

            const encryptPass = await bcrypt.hash(password, 10);

            con.query('INSERT INTO doctor(doc_name,doc_address,doc_telephone,password) VALUES (?,?,?,?)', [name, address, telephone, encryptPass], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Doctor created successfully",
                    doctorId: doc.insertId,
                });
            });


        } else {
            return res.status(400).json({
                status: false,
                message: 'Doctor already exists'
            });
        }
    });
});

exports.updateDoctor = catchAsyncErrors(async (req, res, next) => {

    const { name, address, telephone, password } = req.body;

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Doctor does not exist'
            });
        } else {

            const encryptPass = await bcrypt.hash(password, 10);

            con.query('UPDATE doctor SET doc_name = ?,doc_address = ?,doc_telephone = ?,password = ? WHERE doc_id = ?', [name, address, telephone, encryptPass, req.params.id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Doctor updated successfully",
                });
            });
        }
    });
});

exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Doctor does not exist'
            });
        } else {
            con.query('DELETE FROM doctor WHERE doc_id = ?', [req.params.id], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Doctor deleted successfully",
                });
            });
        }
    });
});

exports.getOneDoc = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Doctor does not exist'
            });
        } else {
            res.status(200).json({
                status: true,
                doctor: [{
                    name: result[0].doc_name,
                    address: result[0].doc_address,
                    telephone: result[0].doc_telephone,
                }]
            });
        }
    });

});

exports.getAllDocs = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor', async function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'No doctors found'
            });
        } else {
            let data = []
            for (var i = 0; i < result.length; i++) {
                data.push({
                    doc_id : result[i].doc_id,
                    name: result[i].doc_name,
                    address: result[i].doc_address,
                    telephone: result[i].doc_telephone,
                });
            }
            res.status(200).json({
                status: true,
                data: data
            });
        }
    });

});