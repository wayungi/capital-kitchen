const express =  require('express')
const router = express.Router()
const path = require('path')
const {v4: uuid } = require('uuid')

const data = {}
data.menu = require('../public/data/menu')

router.route('/:restaurantId')
    //add food
    .post((req, res) => {
        const { name, price, restaurant, path, desc } =  req.body
        if(name === '' || price === '' || restaurant === '' || path === '' || desc === ''){
            res.json({
                "response": "Fill in all fields"
            })
        }
        const menuItem = {
            "id": uuid(),
            name,
            price,
            "restaurant": req.params.restaurantId,
            path,
            desc
        }
        data.menu = [...data.menu, menuItem]
        res.json({"response": menuItem})
    })

    // get restaurant menus
    .get((req, res) => {
        console.log(data.menu)
        const restaurantMenu = data.menu.filter((menuItem) => menuItem.restaurant === req.params.restaurantId) 
        console.log(restaurantMenu)
        if(!restaurantMenu) res.status(200).json({"response": "No menu items found"})
        res.status(200).json({"response": restaurantMenu})
    })

    // //edit food
    // .patch((req, res) => {

    // })

    // //delete food
    // .delete((req, res) => {

    // })

    // // order food
    // .post('/order', (req, res) => {

    // })

    // get menu from a single restaurant

module.exports = router