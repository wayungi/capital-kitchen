const {v4: uuid } = require('uuid')
const data = require('../public/data/menu')

// get all the menu items from all restauranrs
const getMenu = (req, res) => {
    res.json(data.menu)
}

const addMenuItem = (req, res) => {
    const { name, price, restaurantId, path, desc } =  req.body
    if(name === '' || price === '' || restaurantId === '' || path === '' || desc === ''){
        res.json({
            "response": "Fill in all fields"
        })
    }
    const menuItem = {
        "id": uuid(),
        name,
        price,
        "restaurantId": req.params.restaurantId,
        path,
        desc
    }
    data.menu = [...data.menu, menuItem]
    res.json({"response": menuItem})
}

const getMenuByRestaurant = (req, res) => {
    console.log(data.menu)
    const restaurantMenu = data.menu.filter((menuItem) => menuItem.restaurantId === req.params.restaurantId) 
    console.log(restaurantMenu)
    if(!restaurantMenu) res.status(200).json({"response": "No menu items found"})
    res.status(200).json({"response": restaurantMenu})
}

const editMenuItem = (req, res) => {
    const { name, price, restaurantId, path, desc } =  req.body
    if(name === '' || price === '' || restaurantId === '' || path === '' | desc === '') {
        res.status(403).json({
            "response": "Invalid data"
        })
    }
    let menuItem = data.menu.find((menuItem) => menuItem.id === req.params.id)
    if(!menuItem) res.status(200).json({"response": "No menu item found"})
    data.menu = data.menu.filter((menu) => menu.id !== req.params.id);
    menuItem = {...menuItem, ...req.body}
    data.menu = [...data.menu, menuItem]

    console.log(data.menu)
    res.status(200).json({
        "response": menuItem
    })
}

const deleteMenuItem = (req, res) => {
    const itemId =  req.params.id
    const menuItem =  data.menu.find((menuItem) => menuItem.id === itemId)
    if(!menuItem) res.status(200).json({"response": "Item not found"})
    data.menu = data.menu.filter((menuItem) => menuItem.id !== itemId)
    res.status(200).json({"response": menuItem})
 }

module.exports = {
    getMenu,
    addMenuItem,
    getMenuByRestaurant,
    editMenuItem,
    deleteMenuItem 
}