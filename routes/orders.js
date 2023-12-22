const  express =  require('express')
const router =  express.Router()
const { v4: uuid } =  require('uuid')

const data = require('../public/data/orders')

router.route('/:status')
    // get all orders
    .get((req, res) => {

        console.log("here")
        const orders =  data.orders.filter((order) => order.status === req.params.status)
        if(!orders) res.status(200).json({"response": "No order available for this user"})
        res.status(200).json({"response": orders})
    })

router.route('/:userId')
    // order food
    .post((req, res) => {
        const { userId } =  req.params
        const hasEmptyFields = req.body.map((orderItem) => Object.values(orderItem).every((item) => item !== '')).includes(false)
        if (hasEmptyFields) {
            return res.status(400).json({
                "error": "Please fill out all fields"
            })
        }
        const order = {
            orderId: uuid(),
            userId,
            status: "pending",
            items: req.body
        }
        data.orders = [...data.orders, order]
        res.status(200).json({
            "response": order
        })
    })

    // get all users' orders
    .get((req, res) => {
        const orders =  data.orders.filter((order) => order.userId === req.params.userId)
        if(!orders) res.status(200).json({"response": "No order available for this user"})
        res.status(200).json({"response": orders})
    })

module.exports = router
