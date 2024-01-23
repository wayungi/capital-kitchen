const bcrypt = require("bcrypt");
const User =  require('../model/User')
const mongoose = require('mongoose')

const handleRegistration = async (req, res) => {
  console.log(req.body)
  const { username, password, contact, email} = req.body;
  if (!username || !password || !contact || !email)
    return res
      .status(400)
      .json({ message: "All fields are required" });
  const duplicate = await User.findOne({username}).exec();
  if (duplicate) return res.sendStatus(409); // conflict
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  if (!hash) return res.sendStatus(500);
  const newUser = await User.create({
    username,
    password: hash,
    contact,
    email
  });
 console.log(newUser)
  res.status(201).json({ message: `${newUser.username} created` });
};

module.exports = handleRegistration;
