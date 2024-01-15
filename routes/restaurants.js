const express = require('express')
const router =  express.Router()
const {
    addRestaurant,
    getAllRestaurants,
    updateRestaurantData,
    deleteRestaurant,
    disableRestaurant,
    enableRestaurant
} = require('../controller/restaurantController')
const { verifyJWT } =  require('../middleware/verifyJWT')


router.route('/')
    .post(verifyJWT, addRestaurant)    // add restaurnat
    .get( getAllRestaurants)    // get all restaurants
router.route('/:id')
    .put(verifyJWT, updateRestaurantData)    //edit restaurant
    .delete(verifyJWT, deleteRestaurant)    // delete restaurant
router.route('/:id/disable')
    .post(verifyJWT, disableRestaurant)    // disable restaurant
router.route('/:id/enable')
    .post(verifyJWT, enableRestaurant)    // enable restaurant

module.exports = router