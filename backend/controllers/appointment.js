require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const con = require("../config/db");
const responseHanlder = require('../utils/responseHanlder');

exports.createAppointment = catchAsyncErrors(async (req, res, next) => {


    const { appointDate, appointTime, client_id, doc_id, treat_id, status } = req.body;

    con.query('SELECT * FROM doctor where doc_id = ?;SELECT * FROM client where client_id = ?;SELECT * FROM treatment where treat_id = ?', [doc_id, client_id, treat_id], async function (err, result) {

        if (result[0].length == 0) {

            responseHanlder(res, 400, false, 'Doctor with this id does not exist');

        } else if (result[1].length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else if (result[2].length == 0) {

            responseHanlder(res, 400, false, 'Treatment with this id does not exist');

        } else {

            con.query('INSERT INTO appointment(appointDate,appointTime,client_id,doc_id,treat_id,status) VALUES (?,?,?,?,?,?)', [appointDate, appointTime, client_id, doc_id, treat_id, status], function (err, doc) {
                if (err) throw err;

                responseHanlder(res, 200, true, "Appointment created successfully", undefined, doc.insertId);
            });
        }
    });
});

exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {

    const { appointDate, appointTime, doc_id, treat_id, status } = req.body;


    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {

        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Client with this id does not exist');

        } else {

            con.query('SELECT * FROM appointment where client_id = ?', [req.params.id], async function (err, appoint) {
                if (appoint.length == 0) {

                    responseHanlder(res, 400, false, 'Appointment for this client does not exist');

                } else {

                    con.query('UPDATE appointment SET appointDate = ?, appointTime = ?, doc_id = ?, treat_id = ?, status = ? WHERE client_id = ?', [appointDate, appointTime, doc_id, treat_id, status, req.params.id], function (err, doc) {
                        if (err) throw err;


                        responseHanlder(res, 200, true, "Appointment updated successfully");
                    });
                }
            });
        }
    });

});


exports.listAllAppoint = catchAsyncErrors(async (req, res, next) => {

    let data = []
    con.query('SELECT * FROM appointment', function (err, result) {

        if (result.length == 0) {
            responseHanlder(res, 400, false, 'No appointments found');
        } else {
            con.query('SELECT * FROM client where client_id = ?;SELECT * FROM doctor where doc_id = ?;SELECT * FROM treatment where treat_id = ?;', [result[0].client_id, result[0].doc_id, result[0].treat_id], function (err, final) {

                // loop through appointments
                for (let i = 0; i < result.length; i++) {

                    data.push({
                        appointment_id: result[i].appointment_id,
                        appointDate: result[i].appointDate,
                        appointTime: result[i].appointTime,
                        status: result[i].status,
                        client: final[0][0],
                        doctor: {
                            doc_id: final[1][0].doc_id,
                            doc_name: final[1][0].doc_name,
                            doc_address: final[1][0].doc_address,
                            doc_telephone: final[1][0].doc_telephone
                        },
                        treatment: final[2][0]
                    })

                }

                res.status(200).json({
                    status: true,
                    totalAppointments: result.length,
                    appointments: data
                });
            });
        }
    });
});

exports.listByDocId = catchAsyncErrors(async (req, res, next) => {

    let data = [];

    con.query('SELECT * FROM appointment where doc_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Appointment for this doctor does not exist');

        } else {

            con.query('SELECT * FROM client where client_id = ?;SELECT * FROM doctor where doc_id = ?;SELECT * FROM treatment where treat_id = ?;', [result[0].client_id, result[0].doc_id, result[0].treat_id], function (err, final) {

                // loop through appointments
                for (let i = 0; i < result.length; i++) {

                    data.push({
                        appointment_id: result[i].appointment_id,
                        appointDate: result[i].appointDate,
                        appointTime: result[i].appointTime,
                        status: result[i].status,
                        client: final[0][0],
                        doctor: {
                            doc_id: final[1][0].doc_id,
                            doc_name: final[1][0].doc_name,
                            doc_address: final[1][0].doc_address,
                            doc_telephone: final[1][0].doc_telephone
                        },
                        treatment: final[2][0]
                    })

                }

                res.status(200).json({
                    status: true,
                    totalAppointments: result.length,
                    appointments: data
                });
            });
        }
    });
});

exports.listByClientId = catchAsyncErrors(async (req, res, next) => {

    let data = [];

    con.query('SELECT * FROM appointment where client_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Appointment for this client does not exist');

        } else {

            con.query('SELECT * FROM client where client_id = ?;SELECT * FROM doctor where doc_id = ?;SELECT * FROM treatment where treat_id = ?;', [result[0].client_id, result[0].doc_id, result[0].treat_id], function (err, final) {

                // loop through appointments
                for (let i = 0; i < result.length; i++) {

                    data.push({
                        appointment_id: result[i].appointment_id,
                        appointDate: result[i].appointDate,
                        appointTime: result[i].appointTime,
                        status: result[i].status,
                        client: final[0][0],
                        doctor: {
                            doc_id: final[1][0].doc_id,
                            doc_name: final[1][0].doc_name,
                            doc_address: final[1][0].doc_address,
                            doc_telephone: final[1][0].doc_telephone
                        },
                        treatment: final[2][0]
                    })

                }

                res.status(200).json({
                    status: true,
                    totalAppointments: result.length,
                    appointments: data
                });
            });
        }
    });
});

exports.listByTreatId = catchAsyncErrors(async (req, res, next) => {

    let data = [];

    con.query('SELECT * FROM appointment where treat_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {

            responseHanlder(res, 400, false, 'Appointment for this treatment does not exist');

        } else {

            con.query('SELECT * FROM client where client_id = ?;SELECT * FROM doctor where doc_id = ?;SELECT * FROM treatment where treat_id = ?;', [result[0].client_id, result[0].doc_id, result[0].treat_id], function (err, final) {

                // loop through appointments
                for (let i = 0; i < result.length; i++) {

                    data.push({
                        appointment_id: result[i].appointment_id,
                        appointDate: result[i].appointDate,
                        appointTime: result[i].appointTime,
                        status: result[i].status,
                        client: final[0][0],
                        doctor: {
                            doc_id: final[1][0].doc_id,
                            doc_name: final[1][0].doc_name,
                            doc_address: final[1][0].doc_address,
                            doc_telephone: final[1][0].doc_telephone
                        },
                        treatment: final[2][0]
                    })

                }

                res.status(200).json({
                    status: true,
                    totalAppointments: result.length,
                    appointments: data
                });
            });
        }
    });
});


exports.listByStatus = catchAsyncErrors(async (req, res, next) => {

});

