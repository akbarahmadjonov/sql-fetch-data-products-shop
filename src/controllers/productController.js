const Products = require('../models/productModel')
const ApiError = require('../error/ApiError')


class ProductController {
    async get(req, res, next) {
        try {
            const products = await Products.get()
            return res.status(200).json(products)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }
    async post(req, res, next) {
        try {
            const products = await Products.post(req.body, req.files)
            return res.status(201).json(products)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async put(req, res, next) {
        try {
            const products = await Products.put(req.body, req.files, req.params)
            return res.status(201).json(products)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const products = await Products.delete(req.params)
            if (!products) {
                return res.status(404).json("This product has order")
            }
            return res.status(201).json(products)
        }
        catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new ProductController()