const jwt = require("jsonwebtoken");
const secretKey = "token";

module.exports = {
    sign: payload => jwt.sign(payload, secretKey),
    verify: token => jwt.verify(token, secretKey)
};