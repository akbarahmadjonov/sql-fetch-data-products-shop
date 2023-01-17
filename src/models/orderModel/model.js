const GET = `
    select o.id , p.product_name , u.user_name , p.product_img  from orders o inner join products p on p.id = o.product_id inner join users u on u.id = o.user_id ;
`;

const POST = `
insert into orders( product_id , user_id) values ($1, $2)
RETURNING *
`;

const DELETE = `
    delete from orders where id = $1
`;

module.exports = {
    GET,
    POST,
    DELETE,
};
