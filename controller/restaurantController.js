const mongoose = require("mongoose");
const Restaurant = require("../model/Restaurant");

const addRestaurant = async (req, res) => {
  const { name, location, contact } = req.body;
  if (name == "" || location == "" || contact == "")
    return res.status(400).json({ message: "Please fillup all fields" });
  const duplicate = await Restaurant.findOne({ name }).exec();
  if (duplicate) return res.sendStatus(409); //conflict
  const restaurant = await Restaurant.create({
    name,
    location,
    contact,
  });
  if (!restaurant) return res.sendStatus(500);
  res.json(restaurant);
};
 
const getAllRestaurants = async (req, res) => {
  const restaurantList = await Restaurant.find();
  res.json({
    response: restaurantList,
  });
};

const updateRestaurantData = async (req, res) => {
  const { _id, name, location, contact, path } = req.body.data;
  console.log(_id)
  if (name === "" || location == "" || contact == "" || path == "")
    return res.status(400).json({ response: "Please fill up all fields" });
  const restaurant = await Restaurant.findByIdAndUpdate(_id, {
    name,
    location,
    contact,
    path
  }, {new: true});
  if (!restaurant) return res.status(404).json({ response: "No result found" });
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

const toggleActivity = async (req, res) => { // fix throw error when id in invalid
  const _id = req.params?.id;
  const {active} = req.body

  console.log(active)
  const toggledRestaurant = await Restaurant.findByIdAndUpdate(_id, {
    active: !active
  });
  if (!toggledRestaurant) return res.sendStatus(404);
  console.log(toggledRestaurant)
  res.json({ response: toggledRestaurant });
};

module.exports = {
  addRestaurant,
  getAllRestaurants,
  updateRestaurantData,
  deleteRestaurant,
  toggleActivity,
  // enableRestaurant,
};
