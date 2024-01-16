const bcrypt =  require('bcrypt')
const jwt =  require('jsonwebtoken')
const User =  require('../model/User')
const mongoose = require('mongoose')

const handleLogout = async (req, res) => {
    // delete access token on client
    const cookies =  req.cookies
    if(!cookies?.jwt) return  res.sendStatus(204) //No content
    const refreshToken =  cookies.jwt
    const foundUser =  User.findOne({refreshToken}).exec()  //find the user with the refreshToken
    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ })
        return res.sendStatus(204)
    }
    const hasLoggedOut = await User.findOneAndUpdate({refreshToken}, {refreshToken: ""})  // delete refreshtoken from db 
    if(!hasLoggedOut) return res.sendStatus(500)
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ }) // secure: true servers on https/ in production
    res.sendStatus(204)
}

module.exports = handleLogout
