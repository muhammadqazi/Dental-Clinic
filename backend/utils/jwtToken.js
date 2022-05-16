require('dotenv').config()
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {


  jwt.sign(user,
    process.env.JWT_SECRET, {
    expiresIn: "1hr"
  },
    function (err, token) {
      if (err) {
        console.log(err);
      } else {
        res.status(statusCode).json({
          status: true,
          token: token,
        });
      }
    });

  // // options for cookie
  // const options = {
  //   expires: new Date(
  //     Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  // };


};

module.exports = sendToken;
