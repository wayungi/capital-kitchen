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

// const genAccessToken = (req, res) => {
//     const cookies =  req.cookies
//     if(!cookies?.jwt) return res.sendStatus(401)
//     const refreshToken =  cookies.jwt
//     const foundUser =  UsersDB.users.find((user) => user.refreshToken === refreshToken)
//     if(!foundUser) return res.sendStatus(403)
//     // console.log(foundUser)
//     jwt.verify(
//         {"username": foundUser.username},
//         process.env.REFRESH_TOKEN_SECRET,
//         (err, decoded) => {
//             if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
//             const accessToken =  jwt.sign(
//                 {"username": decoded.username},
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '30s' }
//             )
//             res.json({ accessToken })
//         }
//     );
// }

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

module.exports = { 
    // handleRegistration,
    // handleLogin,
    genAccessToken,
    handleLogout
}