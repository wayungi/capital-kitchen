
const mongoose = require("mongoose");
const Menu = require("../model/Menu");

const getMenu = async (req, res) => { // get all the menu items from all restauranrs
  const menuList = await Menu.find();
  if (!menuList) return res.sendStatus(500);
  res.status(200).json(menuList);
};

const addMenuItem = async (req, res) => {
  const { name, price, restaurantId, restaurantName, path, desc } = req.body;
  if (
    name == "" ||
    price == "" ||
    restaurantId == "" ||
    path == "" ||
    desc == "" ||
    restaurantName == ""
  )
    return res.status(400).json({
      response: "Fill in all fields",
    });

  const duplicateMenu = await Menu.findOne({ name, restaurantName }).exec(); //check against duplicate entries
  if (duplicateMenu) return res.sendStatus(409);

  const menuItem = await Menu.create({
    name,
    price,
    restaurantId,
    restaurantName,
    path,
    desc,
  });
  if (!menuItem) return res.sendStatus(500);
  res.json({ response: menuItem });
};

const getMenuByRestaurant = async (req, res) => {
  const restaurantId = req.params?.restaurantId;
  if (!restaurantId) return res.sendStatus(400);
  const menuList = await Menu.find({ restaurantId });
  if (!menuList) return res.sendStatus(500);
  res.status(200).json({ response: menuList });
};

const editMenuItem = async (req, res) => {
  const { _id, name, price, restaurantId, restaurantName, path, desc } =
    req.body;
  if (
    _id == "" ||
    name == "" ||
    price == "" ||
    restaurantId == "" ||
    restaurantName == "" ||
    path == "" ||
    desc == ""
  ) {
    return res.status(400).json({ response: "All fields must be filled in" });
  }

  const updatedMenu = await Menu.findOneAndUpdate(
    { _id },
    { name, price, path, desc },
    { new: true }
  );
  if (!updatedMenu) {
    return res.sendStatus(500);
  }

  res.status(200).json({ response: updatedMenu });
};

const deleteMenuItem = (req, res) => {
  const menuItem = data.menu.find((menuItem) => menuItem.id === itemId);
  if (!menuItem) res.status(200).json({ response: "Item not found" });
  data.menu = data.menu.filter((menuItem) => menuItem.id !== itemId);
  res.status(200).json({ response: menuItem });
};

module.exports = {
  getMenu,
  addMenuItem,
  getMenuByRestaurant,
  editMenuItem,
  deleteMenuItem,
};
