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



const handleLogout = (req, res) => {
    // delete access token on client

    //check for refreshtoken in req
    const cookies =  req.cookies
    if(!cookies?.jwt) return  res.sendStatus(204) //No content
    const refreshToken =  cookies.jwt
    //find the user with the refreshToken ||  check for refreshtoken in db
    const foundUser =  UsersDB.users.find((user) => user.refreshToken === refreshToken)
    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ })
        return res.sendStatus(204)
    }
    // delete refreshtoken from db 
    UsersDB.setUsers([
        ...UsersDB.users.filter((user) => user.refreshToken !== refreshToken), 
        {...foundUser, refreshToken: ''}
    ])
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ }) // secure: true servers on https/ in production
    res.sendStatus(204)
}

module.exports = handleLogout
