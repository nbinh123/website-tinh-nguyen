const express = require("express")
const router = express.Router()

const ShopController = require("../../controllers/ShopControllers")

router.get('/products/get', ShopController.get)
router.get('/products/search', ShopController.search)
router.get('/products/find', ShopController.search_with_keyword)
router.post('/products/arrange', ShopController.arrange)
router.get('/products/read', ShopController.read)
router.put('/products/update/quanlity', ShopController.update_quanlity)
router.get('/shipping/order', ShopController.get_shipping_orders)
router.get('/shipping/status', ShopController.status_shipping_order)

module.exports = router