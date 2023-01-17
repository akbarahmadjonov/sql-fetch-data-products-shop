const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const { validateLogin , validateRegister  } = require('../middleware/validateMiddleware')

router.post('/register' ,validateRegister ,userController.register)
router.post('/login' ,validateLogin ,userController.login)

module.exports = router  