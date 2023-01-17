const { fetch , fetchAll } = require('../../lib/connectdb')
const { FINDONE , CREATE_USER }  =require('./model')
class UserModel {
    async findOne(email){
        let find = await fetch(FINDONE ,email)
        return find
    }

    async create({user_name, phone , email , password}){
        let user = await fetch(CREATE_USER , user_name  , phone , email , password)
        return user
    }

}

module.exports = new UserModel()