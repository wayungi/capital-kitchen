const { v4: uuid } = require("uuid");
const data = {};
data.restaurants = require("../public/data/restaurants");

const mongoose = require("mongoose");
const Restaurant = require("../model/Restaurant");

const addRestaurant = async (req, res) => {
  const { name, location } = req.body;
  if (name == "" || location == "")
    return res.status(400).json({ message: "Please fillup all fields" });
  const duplicate = await Restaurant.findOne({ name }).exec();
  if (duplicate) return res.sendStatus(409); //conflict
  const restaurant = await Restaurant.create({
    name,
    location,
  });
  if (!restaurant) return res.sendStatus(500);
  res.json(restaurant);
};

const getAllRestaurants = async (req, res) => {
  const restaurantList = await Restaurant.find();
  console.log(restaurantList);
  res.json({
    response: restaurantList,
  });
};

const updateRestaurantData = async (req, res) => {
  const { _id, name, location } = req.body;
  if (name === "" || location == "")
    return res.status(400).json({ response: "Please fill up all fields" });
  const restaurant = await Restaurant.findByIdAndUpdate(_id, {
    name,
    location,
  });
  if (!restaurant) res.status(404).json({ response: "No result found" });
  res.json({
    response: restaurant,
  });
};

const deleteRestaurant = async (req, res) => {
  const id = req.params?.id;
  if(!id) return res.sendStatus(400)
  const deletedRestaurant = await Restaurant.findOneAndDelete({ _id: id }); // returns Query
  if (!deletedRestaurant) return res.sendStatus(404);
  res.json({ response: deletedRestaurant });
};

const disableRestaurant = (req, res) => {
  let restaurant = data.restaurants.find(
    (restaurant) => restaurant.id === req.params.id
  );
  if (!restaurant) res.status("404").json({ response: "Not Found" });
  if (restaurant.status === "down")
    res.status(209).json({ response: "Restaurant is already down " });
  restaurant = { ...restaurant, status: "down" };
  data.restaurants = [
    ...data.restaurants.filter((item) => item.id !== restaurant.id),
    restaurant,
  ];
  res.json({ response: restaurant });
};

const enableRestaurant = (req, res) => {
  let restaurant = data.restaurants.find(
    (restaurant) => restaurant.id === req.params.id
  );
  if (!restaurant) res.status("404").json({ response: "Not Found" });
  if (restaurant.status === "up")
    res.status(209).json({ response: "Restaurant is already up " });
  restaurant = { ...restaurant, status: "up" };
  data.restaurants = [
    ...data.restaurants.filter((item) => item.id !== restaurant.id),
    restaurant,
  ];
  res.json({ response: restaurant });
};

module.exports = {
  addRestaurant,
  getAllRestaurants,
  updateRestaurantData,
  deleteRestaurant,
  disableRestaurant,
  enableRestaurant,
};
