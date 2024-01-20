const express = require("express");
const router = express.Router();
const ROLES_LIST =  require('../config/roles_list')
const verifyRoles =  require('../middleware/verifyRoles')
const { verifyJWT } = require("../middleware/verifyJWT");
const {
  addRestaurant,
  getAllRestaurants,
  updateRestaurantData,
  toggleActivity,
  deleteRestaurant,
} = require("../controller/restaurantController");

router
  .route("/")
  .post(/*verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),*/ addRestaurant) // add restaurnat
  .get(getAllRestaurants); // get all restaurants
router
  .route("/:id")
  .put(verifyJWT, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), updateRestaurantData) //edit restaurant
  .delete(/*verifyJWT, verifyRoles(ROLES_LIST.Admin),*/ deleteRestaurant); // delete restaurant
router.route("/activity/:id").put(/*verifyJWT, verifyRoles(ROLES_LIST.Admin),*/ toggleActivity); // disable restaurant
//router.route("/:id/enable").post(verifyJWT, verifyRoles(ROLES_LIST.Admin), enableRestaurant); // enable restaurant

module.exports = router;
