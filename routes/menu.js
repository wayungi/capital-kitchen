const express =  require('express')
const router = express.Router()

const {
    getMenu,
    addMenuItem,
    getMenuByRestaurant,
    editMenuItem,
    deleteMenuItem  
} =  require('../controller/menuController')

router.route('/')
    .get(getMenu)   //get genral menu
router.route('/:restaurantId')
    .post(addMenuItem)    //add food
    .get( getMenuByRestaurant)    // get restaurant menus
router.route('/restaurant/:id')
    .patch(editMenuItem)
    .delete(deleteMenuItem )     //delete food

module.exports = router