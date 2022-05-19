require('dotenv').config()
const bcrypt = require('bcryptjs');
const con = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const responseHanlder = require('../utils/responseHanlder');



exports.createDoctor = catchAsyncErrors(async (req, res, next) => {

    const { name, address, telephone, password } = req.body;


    con.query('SELECT * from doctor where doc_telephone = ?', [telephone], async function (err, result) {
        if (result.length == 0) {

            const encryptPass = await bcrypt.hash(password, 10);

            con.query('INSERT INTO doctor(doc_name,doc_address,doc_telephone,password) VALUES (?,?,?,?)', [name, address, telephone, encryptPass], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Doctor created sucessfully', undefined, doc.insertId);
            });


        } else {

            responseHanlder(res, 400, false, 'Doctor with this telephone already exist');
        }
    });
});

exports.updateDoctor = catchAsyncErrors(async (req, res, next) => {

    const { name, address, telephone, password } = req.body;

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Doctor with this id does not exist');
        } else {

            const encryptPass = await bcrypt.hash(password, 10);

            con.query('UPDATE doctor SET doc_name = ?,doc_address = ?,doc_telephone = ?,password = ? WHERE doc_id = ?', [name, address, telephone, encryptPass, req.params.id], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Doctor updated sucessfully');
            });
        }
    });
});

exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Doctor with this id does not exist');
        } else {
            con.query('DELETE FROM doctor WHERE doc_id = ?', [req.params.id], function (err, doc) {
                if (err) throw err;


                responseHanlder(res, 200, true, 'Doctor deleted sucessfully');
            });
        }
    });
});

exports.getOneDoc = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor where doc_id = ?', [req.params.id], async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Doctor with this id does not exist');
        } else {

            responseHanlder(res, 200, true, undefined, [{
                name: result[0].doc_name,
                address: result[0].doc_address,
                telephone: result[0].doc_telephone,
            }]);
        }
    });

});

exports.getAllDocs = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from doctor', async function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'No doctors found');
        } else {
            let data = []
            for (var i = 0; i < result.length; i++) {
                data.push({
                    doc_id: result[i].doc_id,
                    name: result[i].doc_name,
                    address: result[i].doc_address,
                    telephone: result[i].doc_telephone,
                });
            }

            responseHanlder(res, 200, true, undefined, data);
        }
    });

});