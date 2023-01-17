const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Not authorized"})
        }
        const decoded = jwt.verify(token, 'token')
        if(!decoded){
            return res.status(401).json({message: "Not authorized"})
        }
        req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Not authorized"})
    }
};




