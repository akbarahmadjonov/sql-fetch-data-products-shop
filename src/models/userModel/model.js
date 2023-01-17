const FINDONE = `
    select * from users where email = $1;
`   

const CREATE_USER = `
insert into users( user_name, phone ,  email ,   password) values ($1, $2 , $3 , $4)
RETURNING *
`

module.exports = {
    FINDONE,
    CREATE_USER,
}