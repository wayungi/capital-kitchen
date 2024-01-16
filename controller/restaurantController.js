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
  if (!id) return res.sendStatus(400);
  const deletedRestaurant = await Restaurant.findOneAndDelete({ _id: id }); // returns Query
  if (!deletedRestaurant) return res.sendStatus(404);
  res.json({ response: deletedRestaurant });
};

//========test these later
const disableRestaurant = async (req, res) => {
  const _id = req.params?.id;
  const deactivatedRestaurant = await Restaurant.findByIdAndUpdate(_id, {
    status: "down",
  });
  if (!deactivatedRestaurantes) return res.sendStatus(404);
  res.json({ response: restaurant });
};

const enableRestaurant = async (req, res) => {
  const _id = req.params?.id;
  const activatedRestaurant = await Restaurant.findByIdAndUpdate(_id, {
    status: "up",
  });
  if (!activatedRestaurantes) return res.sendStatus(404);
  res.json({ response: activatedRestaurant });
};

module.exports = {
  addRestaurant,
  getAllRestaurants,
  updateRestaurantData,
  deleteRestaurant,
  disableRestaurant,
  enableRestaurant,
};
