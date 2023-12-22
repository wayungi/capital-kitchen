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

router.route('/')
    .post(addRestaurant)    // add restaurnat
    .get( getAllRestaurants)    // get all restaurants
router.route('/:id')
    .put(updateRestaurantData)    //edit restaurant
    .delete(deleteRestaurant)    // delete restaurant
router.route('/:id/disable')
    .post(disableRestaurant)    // disable restaurant
router.route('/:id/enable')
    .post(enableRestaurant)    // enable restaurant

module.exports = router