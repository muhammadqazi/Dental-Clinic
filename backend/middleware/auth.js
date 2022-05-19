require('dotenv').config()
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

    if (!req.headers.authorization) {

        return next(res.status(401).json({
            status: false,
            message: 'Authentication failed'
        }));

    } else {

        try {

            jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET);

            next();

        } catch (error) {
            return next(res.status(401).json({
                status: false,
                message: error.message
            }));
        }

    }
});

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(res.status(401).json({
                status: false,
                message: 'You are not authorized to perform this action'
            }));
        }

        next();
    };
};
