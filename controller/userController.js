const { v4: uuidv4 } = require('uuid');

const UsersDB =  {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users =  data
    }
}

const path = require('path')
const fsPromises =  require('fs').promises
const bcrypt =  require('bcrypt')

//jwt
const jwt =  require('jsonwebtoken')
require('dotenv').config()

const handleRegistration = (req, res) => {
    const { username, password } =  req.body
    // check if not blank
    if(!username || !password) res.status(400).json({'message': 'Username & Password are required'})
    //check of existsnce
    const duplicate = UsersDB.users.find((person) => person.username === username)
    if(duplicate) res.sendStatus(409) // conflict
    // encrypt and store
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            //catch any errors
            if(err) {
                res.sendStatus(500)
            }else{
                const newUser = {id: uuidv4(), username, password: hash}
                UsersDB.setUsers([...UsersDB.users, newUser])
                res.status(201).json({'message': `${newUser.username} created`})
            }
        });
    });
}

const handleLogin = (req, res) => {
    //check if values are all filled
    const { username, password } = req.body
    //check for username match in db
    const foundUser =  UsersDB.users.find((user) => user.username === username)
    if(!foundUser) res.sendStatus(404)
    // compare password
    const match = bcrypt.compareSync(password, foundUser.password); // true
    if(!match) res.sendStatus(403)
    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
    ) // do not pass in sensitive data like passwords as jwt payload
    
    const refrshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    ) 
    //update the foundUser with a refreshToken
    UsersDB.setUsers([
        {...foundUser, refrshToken}, 
        ...UsersDB.users.filter((user) => user.username !== foundUser.username)
    ])
    res.status(200).json({'message': `${foundUser.username} logged in`})
}

module.exports = { 
    handleRegistration,
    handleLogin
}