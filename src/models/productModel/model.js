const GET = `
    select id ,product_name , product_desc , product_img , product_price from products;
`   

const POST = `
insert into products( product_name  , product_desc , product_img , product_price) values ($1, $2 , $3 , $4)
RETURNING *
`

const PUT = `

    update products 
    set product_name = $1, product_desc = $2 , product_img = $3 , product_price = $4 where id = $5
`

const DELETE = `
    delete from products where id = $1
`

module.exports = {
    GET,
    POST,
    PUT,
    DELETE
}