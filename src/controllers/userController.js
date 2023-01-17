const User = require('../models/userModel');
const { sign } = require('../lib/jwt');
const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');

class UserController {
    async register(req, res , next) {
        try{
            const { user_name,phone,email,password } = req.body
            const candidate = await User.findOne(email)
            if(candidate){
                return next(ApiError.badRequest('This email already exists'))
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const userCreate = await User.create({user_name , phone , email , password:hashPassword })
            return res.status(201).json({token:sign(userCreate)})
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
    async login(req,res , next){
        try{
            const { email, password } = req.body
            const candidate= await User.findOne(email)
            if(!candidate){
                return next(ApiError.internal('User is not found'))
            }
            let comparePassword = bcrypt.compareSync(password, candidate.password)
            if (!comparePassword) {
                return next(ApiError.internal('Wrong password specified'))
            }
            return res.status(201).json({token:sign(candidate)})
        }
        catch(e){
            return next(ApiError.badRequest(e.message))
        }
    }
   
}

module.exports = new UserController()