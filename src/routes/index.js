const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')

router.use('/user' , userRouter)
router.use('/product' , productRouter)
router.use('/order' , orderRouter)


module.exports = router