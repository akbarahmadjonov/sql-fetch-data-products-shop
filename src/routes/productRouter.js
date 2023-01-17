const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const authMiddleware = require('../middleware/authMiddleware')
const { validateProduct  } = require('../middleware/validateMiddleware')

router.get('/',authMiddleware, productController.get)
router.post('/',validateProduct,authMiddleware, productController.post)
router.put('/:id',authMiddleware, productController.put)
router.delete('/:id',authMiddleware, productController.delete)

module.exports = router  