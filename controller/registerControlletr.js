const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const path = require("path");
//const { writeFile } = require("fs").promises;
// const UsersDB = {
//   users: require("../model/users.json"),
//   setUsers: function (data) {
//     this.users = data;
//   },
// };
const User =  require('../model/User')
const mongoose = require('mongoose')

const handleRegistration = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username & Password are required" });
  const duplicate = await User.findOne({username}).exec();
  if (duplicate) return res.sendStatus(409); // conflict
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  if (!hash) return res.sendStatus(500);
  const newUser = await User.create({
    username,
    password: hash,
  });
  /* try {
     const filePath = path.join(__dirname, "..", "model", "users.json");
    const promise = await writeFile(
     filePath,
       JSON.stringify([...UsersDB.users, newUser])
    );
  } catch (err) {
    console.log(err);
  }
   UsersDB.setUsers([...UsersDB.users, newUser]);
  */
 console.log(newUser)
  res.status(201).json({ message: `${newUser.username} created` });
};

module.exports = handleRegistration;
