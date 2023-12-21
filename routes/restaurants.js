const express = require('express')
const router =  express.Router()
const path =  require('path')
const { v4: uuid } = require('uuid')

const data = {}
data.restaurants = require('../public/data/restaurants')

router.route('/')
    // add restaurnat
    .post((req, res) => {
        const restaurant = {
            "id": uuid(),
            "name": req.body.name,
            "location": req.body.location,
            "status": "up"
        }
        data.restaurants.push(restaurant)
        res.json(restaurant)
    })

    // get all restaurants
    .get((req, res) => {
        res.json({
            "response": data.restaurants
        })
    })

    // disable restaurant
router.route('/:id')
    //edit restaurant
    .put((req, res) => {
        const { name, location } =  req.body
        if(name === '' || location == '') res.status(400).json({"response": "invalid data"})
        let restaurant = data.restaurants.find((restaurant) => restaurant.id === req.params.id)
        if(!restaurant) res.status('404').json({"response": "Not Found"})
        data.restaurants = data.restaurants.filter((restaurant) => restaurant.id !== req.body.id)
        restaurant = { ...restaurant, ...req.body }
        data.restaurants = [...data.restaurants, restaurant]
        res.json({
            "response": restaurant
        })
    })

    // delete restaurant
    .delete((req, res) => {
        const restaurant = data.restaurants.find((restaurant) => restaurant.id === req.params.id)
        if(!restaurant) res.status('404').json({"response": "Not Found"})
        data.restaurants = [...data.restaurants.filter((restaurant) => restaurant.id !== req.params.id)]
        res.json({ "response": restaurant })
    })

    // disable restaurant
router.route('/:id/disable')
    .post( (req, res) => {
        let restaurant = data.restaurants.find((restaurant) => restaurant.id === req.params.id)
        if(!restaurant) res.status('404').json({"response": "Not Found"})
        if(restaurant.status === "down") res.status(209).json({"response": "Restaurant is already down "})
        restaurant = {...restaurant, status: "down"}
        data.restaurants = [...data.restaurants.filter((item) => item.id !== restaurant.id ), restaurant]
        res.json({ "response": restaurant })
    })

    // enable restaurant
router.route('/:id/enable')
    .post((req, res) => {
        let restaurant = data.restaurants.find((restaurant) => restaurant.id === req.params.id)
        if(!restaurant) res.status('404').json({"response": "Not Found"})
        if(restaurant.status === "up") res.status(209).json({"response": "Restaurant is already up "})
        restaurant = {...restaurant, status: "up"}
        data.restaurants = [...data.restaurants.filter((item) => item.id !== restaurant.id ), restaurant]
        res.json({ "response": restaurant })
    })


module.exports = router