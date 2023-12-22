const  express =  require('express')
const router =  express.Router()
const data = require('../public/data/orders')

const {
    getOrdersByStatus,
    makeOrder,
    getOrdersByUser
} = require('../controller/ordersController')

router.route('/:status')
    .get(getOrdersByStatus)    // get all orders
router.route('/user/:userId')
    .post(makeOrder)    // order food
    .get(getOrdersByUser)    // get all users' orders

module.exports = router
