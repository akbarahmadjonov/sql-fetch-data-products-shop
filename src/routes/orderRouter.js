const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const authMiddleware = require('../middleware/authMiddleware')
const { validateOrder } = require('../middleware/validateMiddleware')

router.get('/', authMiddleware, orderController.get)
router.post('/', authMiddleware, validateOrder, orderController.post)
router.delete('/:id', authMiddleware, orderController.delete)

module.exports = router  