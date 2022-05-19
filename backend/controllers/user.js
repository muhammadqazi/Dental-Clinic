require('dotenv').config()
const con = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


exports.createUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    con.query('SELECT * from users where email = ?', [email], async function (err, result) {
        if (result.length == 0) {
            const encryptPass = await bcrypt.hash(password, 10);

            con.query('INSERT INTO users(name,email,password,role,_isauthenticated,_isverified) VALUES (?,?,?,?,?,?)', [name, email, encryptPass, role, false, false], function (err) {
                if (err) throw err;
            });

            con.query('SELECT * from users where email = ?', [email], async function (err, result) {
                if (result.length > 0) {

                    con.query('SELECT * FROM OTP where user_id = ?', [result[0].user_id], async function (err, otp) {
                        if (otp.length == 0) {

                            const code = Math.floor(100000 + Math.random() * 900000);

                            const token = jwt.sign({ name: result[0].name, email: result[0].email, role: result[0].role, }, process.env.JWT_SECRET, { expiresIn: "1hr" });


                            con.query('INSERT INTO OTP(code,token,user_id,created_time) VALUES (?,?,?,?)', [code, token, result[0].user_id, new Date()], function (err, result) {

                                if (err) throw err;
                            });

                            res.status(200).json({
                                status: true,
                                message: 'OTP has been sent to your email',
                                token: token,
                                expires_in: 3600
                            });
                        } else {
                            res.status(400).json({
                                status: true,
                                message: 'Please wait, OTP has already been sent to your email',
                            });
                        }
                    });

                }
            });

        } else {
            return res.status(400).json({
                status: false,
                message: 'User already exists'
            });
        }
    })



});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const { email } = req.body;

    con.query('SELECT * from users where email = ?', [email], async function (err, result) {
        if (result.length > 0) {

            con.query('SELECT * FROM OTP where user_id = ?', [result[0].user_id], async function (err, otp) {
                if (otp.length == 0) {

                    const code = Math.floor(100000 + Math.random() * 900000);

                    const token = jwt.sign({ name: result[0].name, email: result[0].email, role: result[0].role, }, process.env.JWT_SECRET, { expiresIn: "1hr" });


                    con.query('INSERT INTO OTP(code,token,user_id,created_time) VALUES (?,?,?,?)', [code, token, result[0].user_id, new Date()], function (err, result) {

                        if (err) throw err;
                    });

                    res.status(200).json({
                        status: true,
                        message: 'OTP has been sent to your email',
                        token: token,
                        expires_in: 3600
                    });
                } else {
                    res.status(400).json({
                        status: true,
                        message: 'Please wait, OTP has already been sent to your email',
                    });
                }
            });

        }
    });
});

exports.codeVerification = catchAsyncErrors(async (req, res, next) => {
    const { code } = req.body;

    const decode = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

    con.query('SELECT * from users where email = ?', [decode.email], async function (err, result) {
        if (result.length > 0) {

            con.query('SELECT * FROM OTP where (token = ? AND user_id = ?)', [req.headers.authorization.split(' ')[1], result[0].user_id], async function (err, otp) {

                if (otp.length > 0) {
                    if (otp[0].code == code) {

                        const token = jwt.sign({ name: result[0].name, email: result[0].email, role: result[0].role, }, process.env.JWT_SECRET, { expiresIn: "1hr" });

                        con.query('UPDATE users SET _isverified = ? WHERE user_id = ?', [true, result[0].user_id], function (err) {
                            if (err) throw err;
                        });

                        con.query('DELETE FROM OTP WHERE (token = ? AND user_id = ?)', [req.headers.authorization.split(' ')[1], result[0].user_id], async (error, results) => {
                            if (err) throw err;
                        })

                        res.status(200).json({
                            status: true,
                            message: 'OTP verified successfully',
                            token: token,
                            expires_in: 3600
                        });
                    } else {
                        res.status(400).json({
                            status: false,
                            message: 'OTP is not valid',
                        });
                    }
                } else {
                    res.status(400).json({
                        status: false,
                        message: 'OTP is not valid',
                    });
                }
            });
        }
    });

});

exports.newPassword = catchAsyncErrors(async (req, res, next) => {
    const { password } = req.body;

    const decode = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

    con.query('SELECT * from users where email = ?', [decode.email], async function (err, result) {
        if (result.length > 0) {

            const encryptPass = await bcrypt.hash(password, 10)

            con.query('UPDATE users SET password = ? WHERE user_id = ?', [encryptPass, result[0].user_id], function (err) {
                if (err) throw err;
            });

            res.status(200).json({
                status: true,
                message: 'Password updated successfully',
            });
        }
    })
})


exports.loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;


    con.query('SELECT * from users where email = ?', [email], function (err, result) {
        if (result.length == 0) {
            return res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        } else {

            if (bcrypt.compareSync(password, result[0].password)) {

                res.status(200).json({
                    status: true,
                    token: jwt.sign({ name: result[0].name, email: result[0].email, role: result[0].role, }, process.env.JWT_SECRET, { expiresIn: "1hr" }),
                    expires_in: 3600
                });
                // sendToken({
                //     name: result[0].name,
                //     email: result[0].email,
                //     role: result[0].role,

                // }, 200, res);

            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Password is incorrect'
                });
            }
        }
    })
});

exports.getUserByEmail = catchAsyncErrors(async (req, res, next) => {

    const decode = jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

    con.query('SELECT * from users where email = ?', [decode.email], function (err, result) {
        if (result.length > 0) {
            res.status(200).json({
                status: true,
                data:
                    [
                        {
                            user_id: result[0].user_id,
                            name: result[0].name,
                            email: result[0].email,
                            role: result[0].role,
                            _isverified: result[0]._isverified,
                            _isauthenticated: result[0]._isauthenticated
                        }
                    ]
            });
        } else {
            res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
    })
});

exports.getUserById = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from users where user_id = ?', [req.params.id], function (err, result) {
        if (result.length > 0) {
            res.status(200).json({
                status: true,
                data:
                    [
                        {
                            name: result[0].name,
                            email: result[0].email,
                            role: result[0].role,
                            _isverified: result[0]._isverified,
                            _isauthenticated: result[0]._isauthenticated
                        }
                    ]
            });
        } else {
            res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
    })
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, role } = req.body;

    con.query('SELECT * from users where user_id = ?', [req.params.id], function (err, result) {
        if (result.length > 0) {

            con.query('UPDATE users SET name = ?, email = ?, role = ? WHERE user_id = ?', [name, email, role, req.params.id], function (err) {
                if (err) throw err;
            });

            res.status(200).json({
                status: true,
                message: 'User updated successfully'
            });

        } else {
            res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
    });
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from users where user_id = ?', [req.params.id], function (err, result) {
        if (result.length > 0) {

            con.query('DELETE FROM users WHERE user_id = ?', [req.params.id], function (err) {
                if (err) throw err;
            });

            res.status(200).json({
                status: true,
                message: 'User deleted successfully'
            });

        } else {
            res.status(400).json({
                status: false,
                message: 'User does not exist'
            });
        }
    });
});

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {

    con.query('SELECT * from users', function (err, result) {
        let data = []
        if (result.length > 0) {
            for (var i = 0; i < result.length; i++) {
                data.push({
                    user_id: result[i].user_id,
                    name: result[i].name,
                    email: result[i].email,
                    role: result[i].role,
                    _isverified: result[i]._isverified,
                    _isauthenticated: result[i]._isauthenticated
                });
            }
            res.status(200).json({
                status: true,
                data: data
            });

        } else {

            res.status(400).json({
                status: false,
                message: 'No users found'
            });
        }
    });
});