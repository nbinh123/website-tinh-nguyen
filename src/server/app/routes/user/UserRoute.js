const express = require("express")
const router = express.Router()

const UserController = require("../../controllers/UserControllers")

router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.get('/get', UserController.get_infomation)
router.put('/info/update', UserController.update_infomations)

router.put('/cart/pay', UserController.request_bill)

router.put('/cart/update/quanlity', UserController.update_quanlity_order)
router.put('/cart/update/create', UserController.create_order)
router.get('/cart/get', UserController.get_card)
router.delete('/cart/update/delete', UserController.delete_order)

router.post('/cart/bill/pay', UserController.pay)

router.get('/coin/get', UserController.get_coin)
router.put('/coin/update', UserController.update_coin)
router.post('/coin/buy', UserController.reward_exchange_by_coin)

router.put('/config/update', UserController.config)

router.post('/friend/request', UserController.request_friend)
router.post('/friend/request/cancel', UserController.cancel_request_friend)
router.post('/friend/request/accept', UserController.accept_request_friend)
router.post('/friend/request/reject', UserController.reject_request_friend)

router.post('/nofication/create', UserController.create_nofication)
router.get('/nofications/get', UserController.get_nofications)

router.use('/', UserController.index)


module.exports = router