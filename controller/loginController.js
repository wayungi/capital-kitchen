const path = require("path");
const { writeFile } = require("fs").promises;
const bcrypt = require("bcrypt");
const ROLES_LIST = require('../config/roles_list')
const UsersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

//jwt
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = UsersDB.users.find((user) => user.username === username);
  if (!foundUser) return res.sendStatus(404);
  const match = bcrypt.compareSync(password, foundUser.password); // true
  if (!match) return res.sendStatus(403);
  const isLoggedin = foundUser.refreshToken;
  if (isLoggedin) return res.sendStatus(401); // catch multiple logins on same account
  //get the user roles for the logged in user
  const roles =  foundUser.roles
  // do not pass in sensitive data like passwords as jwt payload
  const accessToken = jwt.sign(
    { "UserInfo": {
        "username": foundUser.username,
        "roles": roles
        }
    },
    
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "30s" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  //update the foundUser with a refreshToken
  UsersDB.setUsers([
    { ...foundUser, refreshToken },
    ...UsersDB.users.filter((user) => user.username !== foundUser.username),
  ]);

  /* write the nes users array to the file*/
  const filePath = path.join(__dirname, "..", "model", "users.json");
  try {
    await writeFile(
      filePath,
      JSON.stringify([
        { ...foundUser, refreshToken },
        ...UsersDB.users.filter((user) => user.username !== foundUser.username),
      ])
    );
  } catch (err) {
    return res.sendStatus(500);
  }
  /* 
        return the token to the front & remeber to keep it in memory / as httpOnly cookie wc is not 
        accessible by js
        A cookie is always sent with every request but httpOnly cookies are not accesible to js
    */
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(200).json({ accessToken });
};

module.exports = handleLogin;
