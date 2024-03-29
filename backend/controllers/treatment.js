require('dotenv').config()
const con = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const responseHanlder = require('../utils/responseHanlder');


exports.createTreatment = catchAsyncErrors(async (req, res, next) => {

    const { treatment_name, description, doc_id, treat_price } = req.body;

    con.query('SELECT * FROM doctor where doc_id = ?', [doc_id], async function (err, result) {

        if (result.length == 0) {

            
            responseHanlder(res, 400, false, 'Doctor with this id does not exist');

        } else {

            con.query('SELECT * FROM treatment where doc_id = ?', [doc_id], async function (err, result) {

                if (result.find(element => element.treat_name == treatment_name)) {

                    responseHanlder(res, 400, false, 'Doctor with this id already has this treatment');

                } else {

                    con.query('INSERT INTO treatment(treat_name,treat_desc,doc_id,treat_price) VALUES (?,?,?,?)', [treatment_name, description, doc_id, treat_price], function (err, doc) {
                        if (err) throw err;

                        responseHanlder(res, 200, true, 'Treatment created sucessfully', undefined, doc.insertId);
                    });

                }
            });
        }
    });

});

exports.getTreatmentByDocId = catchAsyncErrors(async (req, res, next) => {

    const data = [];

    con.query('SELECT * FROM doctor where doc_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            
            responseHanlder(res, 400, false, 'Doctor with this id does not exist');

        } else {

            con.query('SELECT * FROM treatment where doc_id = ?', [req.params.id], function (err, treat) {
                if (treat.length == 0) {
                    
                    responseHanlder(res, 400, false, 'Doctor with this id has no treatment');

                } else {

                    for (var i = 0; i < treat.length; i++) {
                        data.push({
                            treatmentId: treat[i].treat_id,
                            treatmentName: treat[i].treat_name,
                            treatmentDescription: treat[i].treat_desc,
                            treatmentPrice: treat[i].treat_price,
                        });
                    }

                    res.status(200).json({
                        status: true,
                        treatments: data,
                        doctor: {
                            doctorId: result[0].doc_id,
                            name: result[0].doc_name,
                            address: result[0].doc_address,
                            telephone: result[0].doc_telephone,
                        }
                    });
                }

            });
        }
    });
});


exports.updateTreatment = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM doctor where doc_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            
            responseHanlder(res, 400, false, 'Doctor with this id does not exist');

        } else {

            con.query('SELECT * FROM treatment where doc_id = ? AND treat_id = ?', [req.params.id, req.params.treatmentId], function (err, treat) {
                if (treat.length == 0) {
                    
                    responseHanlder(res, 400, false, 'Doctor with this id does not have any treatment');

                } else {

                    con.query('UPDATE treatment SET treat_name = ?, treat_desc = ?, treat_price = ? WHERE treat_id = ?', [req.body.treatment_name, req.body.description, req.body.price, req.params.treatmentId], function (err, doc) {
                        if (err) throw err;

                        
                        responseHanlder(res, 200, true, 'Treatment updated sucessfully');
                    });

                }
            });
        }
    });
});

exports.deleteTreatment = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * FROM doctor where doc_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            
            responseHanlder(res, 400, false, 'Doctor with this id does not exist');

        } else {

            con.query('SELECT * FROM treatment where doc_id = ? AND treat_id = ?', [req.params.id, req.params.treatmentId], function (err, treat) {
                if (treat.length == 0) {
                    
                    responseHanlder(res, 400, false, 'Doctor with this id does not have any treatment');

                } else {

                    con.query('DELETE FROM treatment WHERE treat_id = ?', [req.params.treatmentId], function (err, doc) {
                        if (err) throw err;

                        
                        responseHanlder(res, 200, true, 'Treatment deleted sucessfully');
                    });

                }
            });
        }
    });
});

