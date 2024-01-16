const bcrypt = require("bcrypt");
const User =  require('../model/User')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  const foundUser = await User.findOne({username}).exec()
  if (!foundUser) return res.sendStatus(404);
  const match = bcrypt.compareSync(password, foundUser.password); // true
  if (!match) return res.sendStatus(403);
  const isAlreadyLoggedin = foundUser.refreshToken;
  if (isAlreadyLoggedin) return res.sendStatus(401); // catch multiple logins on same account
  const roles =  Object.values(foundUser.roles)  //get the user roles for the logged in user
  const accessToken = jwt.sign(
    { "UserInfo": {
        "username": foundUser.username,
        "roles": roles
        }
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  const refreshToken = jwt.sign(
    { username: foundUser.username },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  //update the foundUser with a refreshToken
  const hasLoggedIn = await User.findOneAndUpdate({username: foundUser.username}, {refreshToken})
  if(!hasLoggedIn) return res.sendStatus(500); 
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
