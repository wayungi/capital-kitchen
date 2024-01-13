const path = require('path')
const {writeFile} =  require('fs').promises
const bcrypt =  require('bcrypt')
const UsersDB =  {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users =  data
    }
}

//jwt
const jwt =  require('jsonwebtoken')
require('dotenv').config()

const handleLogout = async (req, res) => {
    // delete access token on client
    //check for refreshtoken in req
    // console.log(UsersDB.users)
    const cookies =  req.cookies
    // console.log(cookies)
    if(!cookies?.jwt) return  res.sendStatus(204) //No content
    const refreshToken =  cookies.jwt
    //find the user with the refreshToken ||  check for refreshtoken in db
    const foundUser =  UsersDB.users.find((user) => user.refreshToken === refreshToken)
    if(!foundUser){
        res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ })
        return res.sendStatus(204)
    }
    // delete refreshtoken from db 
    const newArray = [...UsersDB.users.filter((user) => user.refreshToken !== refreshToken), {...foundUser, refreshToken: ''}]
    UsersDB.setUsers(newArray)
    const filePath = path.join(__dirname, '..', 'model', 'users.json')
    try {
        await writeFile(filePath, JSON.stringify(newArray));
    }catch(err){
        console.log(err)
        return res.sendStatus(500)
    }
    res.clearCookie('jwt', { httpOnly: true, maxAge: 24*60*60*1000, /*secure: true*/ }) // secure: true servers on https/ in production
    res.sendStatus(204)
}

module.exports = handleLogout
