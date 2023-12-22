const  express =  require('express')
const router =  express.Router()
const { v4: uuid } =  require('uuid')

const data = require('../public/data/orders')

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
            items: req.body
        }
        data.orders = [...data.orders, order]
        res.status(200).json({
            "response": order
        })
    })

    // get all orders
    .get((req, res) => {
        

    })

module.exports = router
