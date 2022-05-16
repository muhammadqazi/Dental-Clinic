const _connect_database = require("../config/db");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var con = _connect_database();

exports.createUser = catchAsyncErrors(async (req, res, next) => {

    const { name, email, password, role } = req.body;

    // CREATE TABLE users (user_id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY, name VARCHAR(255) ,  password VARCHAR(255), email VARCHAR(255) ,  role VARCHAR(50) ,  _isauthenticated bool, _isverified bool)


    con.query('SELECT * from users where email = ?', [email], async function (err, result) {
        if (result.length == 0) {
            const encryptPass = await bcrypt.hash(password, 10);

            con.query('INSERT INTO users(name,email,password,role,_isauthenticated,_isverified) VALUES (?,?,?,?,?,?)', [name, email, encryptPass, role, false, false], function (err, result) {
                if (err) throw err;
            });

            sendToken({
                name: name,
                email: email,
                role: role
            }, 201, res);

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
            sendToken({
                name: result[0].name,
                email: result[0].email,
                role: result[0].role,

            }, 200, res);
        }
    });
});

exports.codeVerification = catchAsyncErrors(async (req, res, next) => {
    console.log(1);
});

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

                sendToken({
                    name: result[0].name,
                    email: result[0].email,
                    role: result[0].role,

                }, 200, res);

            } else {
                return res.status(400).json({
                    status: false,
                    message: 'Password is incorrect'
                });
            }
        }
    })
});

