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

const handleLogin = (req, res) => {
    const { username, password } = req.body
    const foundUser =  UsersDB.users.find((user) => user.username === username)
    if(!foundUser) return res.sendStatus(404)
    const match = bcrypt.compareSync(password, foundUser.password); // true
    if(!match) return res.sendStatus(403)
    // do not pass in sensitive data like passwords as jwt payload
    const accessToken = jwt.sign({ "username": foundUser.username },process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'}) 
    const refreshToken = jwt.sign({ "username": foundUser.username }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'}) 
    //update the foundUser with a refreshToken
    UsersDB.setUsers([{...foundUser, refreshToken}, ...UsersDB.users.filter((user) => user.username !== foundUser.username)])
    /* 
        return the token to the front & remeber to keep it in memory / as httpOnly cookie wc is not 
        accessible by js
        A cookie is always sent with every request but httpOnly cookies are not accesible to js
    */
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, secure:true})
    res.status(200).json({accessToken})
}

module.exports =  handleLogin