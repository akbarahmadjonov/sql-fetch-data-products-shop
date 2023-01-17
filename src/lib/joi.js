const { not } = require("joi");
const Joi = require("joi");



exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

exports.productScheam = Joi.object({
    product_name: Joi.string().required().min(2).max(30),
    product_desc: Joi.string().required().min(2).max(100),
    product_price: Joi.string().required().min(1).max(10)
});

exports.registerSchema = Joi.object({
    user_name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().length(9).pattern(/^[0-9]+$/),
    email: Joi.string().max(50).email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

exports.orderScheam = Joi.object({
    product_id: Joi.number().required(),
});


