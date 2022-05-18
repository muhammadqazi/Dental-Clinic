require('dotenv').config()
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const _connect_database = require("../config/db");


var con = _connect_database();


exports.createAppointment = catchAsyncErrors(async (req, res, next) => {


    const { appointDate, appointTime, client_id, doc_id, treat_id, status } = req.body;

    con.query('SELECT * FROM doctor where doc_id = ?;SELECT * FROM client where client_id = ?;SELECT * FROM treatment where treat_id = ?', [doc_id, client_id, treat_id], async function (err, result) {

        if (result[0].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Doctor with this id does not exist'
            });
        } else if (result[1].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else if (result[2].length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Treatment with this id does not exist'
            });
        } else {

            con.query('INSERT INTO appointment(appointDate,appointTime,client_id,doc_id,treat_id,status) VALUES (?,?,?,?,?,?)', [appointDate, appointTime, client_id, doc_id, treat_id, status], function (err, doc) {
                if (err) throw err;

                res.status(200).json({
                    status: true,
                    message: "Appointment created successfully",
                    appointmentId: doc.insertId,
                });
            });
        }
    });
});

exports.updateAppointment = catchAsyncErrors(async (req, res, next) => {

    const { appointDate, appointTime, doc_id, treat_id, status } = req.body;


    con.query('SELECT * FROM client where client_id = ?', [req.params.id], function (err, result) {

        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'Client with this id does not exist'
            });
        } else {

            con.query('SELECT * FROM appointment where client_id = ?', [req.params.id], async function (err, appoint) {
                if (appoint.length == 0) {
                    return res.status(400).json({
                        status: false,
                        message: 'Client has no appointment'
                    });
                } else {
                    var dateObj = new Date(appoint[0].appointDate);
                    var month = dateObj.getUTCMonth() + 1;
                    var day = dateObj.getUTCDate();
                    var year = dateObj.getUTCFullYear();

                    if (day < 10) {
                        day = "0" + day;
                    } else if (month < 10) {
                        month = "0" + month;
                    }
                    newdate = year + "-" + month + "-" + day;
                    console.log(newdate);
                    console.log(req.params.date);
                    if (newdate == req.params.date) {
                        con.query('UPDATE appointment SET appointDate = ?, appointTime = ?, doc_id = ?, treat_id = ?, status = ? WHERE client_id = ?', [appointDate, appointTime, doc_id, treat_id, status, req.params.id], function (err, doc) {
                            if (err) throw err;

                            res.status(200).json({
                                status: true,
                                message: "Appointment updated successfully",
                                appointmentId: req.params.id,
                            });
                        });
                    } else {
                        return res.status(400).json({
                            status: false,
                            message: 'Appointment date is not correct'
                        });
                    }

                }
            });


        }
    });

});


exports.listByDocId = catchAsyncErrors(async (req, res, next) => {

    let data = [];

    con.query('SELECT * FROM appointment where doc_id = ?', [req.params.id], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'No appointments found'
            });
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
            return res.status(400).json({
                status: false,
                message: 'No appointments found'
            });
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
            return res.status(400).json({
                status: false,
                message: 'No appointments found'
            });
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
