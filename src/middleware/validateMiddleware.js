const { 
    loginSchema,
    registerSchema,
    productScheam,
    orderScheam
} = require("../lib/joi");

const validateLogin = (req, res, next) => {
    const data = loginSchema.validate(req.body);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
};



const validateRegister = (req, res, next) => {
    console.log(req.body)
    const data = registerSchema.validate(req.body);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
};


const validateProduct = (req,res,next) => {
    const data = productScheam.validate(req.body);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
}

const validateOrder = (req, res, next) => {
    const data = orderScheam.validate(req.body);
    if(data.error) {
        res.status(403)
        .json({ message: data.error.details[0].message });
    } else {
        next();
    };
};




module.exports = {
    validateLogin , 
    validateRegister,
    validateProduct,
    validateOrder
}