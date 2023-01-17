const Orders = require('../models/orderModel')
const ApiError = require('../error/ApiError')


class ProductController {
    async get(req, res, next) {
        try {
            const orders = await Orders.get()
            return res.status(200).json(orders)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async post(req, res, next) {
        try {
            const orders = await Orders.post(req.body, req.user)
            if (!orders) {
                return next(ApiError.internal('product is not found'))
            }
            return res.status(201).json(orders)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const orders = await Orders.delete(req.params)
            return res.status(201).json(orders)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ProductController()