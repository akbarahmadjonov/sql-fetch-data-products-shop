const { fetch, fetchAll } = require('../../lib/connectdb')
const { GET, POST, PUT, DELETE } = require('./model')
const path = require('path')
const { v4 } = require('uuid');

class UserModel {
    async get() {
        return await fetchAll(GET)
    }

    async post({ product_name, product_desc, product_price }, { product_img }) {
        let productImage = v4() + '.' + product_img.name.replace(/\s/g, " ").split('.')[1]
        let product = await fetch(POST, product_name, product_desc, productImage, product_price)
        product_img.mv(path.join(process.cwd(), 'src', "static", productImage), (err) => {
            if (err) {
                console.log(err)
            }
        })
        return product
    }

    async put({ product_name, product_desc, product_price }, { product_img }, { id }) {
        let productImage = v4() + '.' + product_img.name.replace(/\s/g, " ").split('.')[1]
        await fetch(PUT, product_name, product_desc, productImage, product_price, id)
        product_img.mv(path.join(process.cwd(), 'src', "static", productImage), (err) => {
            if (err) {
                console.log(err)
            }
        })
        return 'updated'
    }

    async delete({ id }) {
        let data = await fetch(`select * from orders where product_id = ${id}`)
        if (data) {
            return false
        }
        await fetch(DELETE, id)
        return 'deleted'
    }



}

module.exports = new UserModel()