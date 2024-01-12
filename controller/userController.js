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
    const { username, password } = req.body
    const foundUser =  UsersDB.users.find((user) => user.username === username)
    if(!foundUser) res.sendStatus(404)
    const match = bcrypt.compareSync(password, foundUser.password); // true
    if(!match) res.sendStatus(403)

    const accessToken = jwt.sign(
        { "username": foundUser.username },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: '30s'}
    ) // do not pass in sensitive data like passwords as jwt payload
    
    const refreshToken = jwt.sign(
        { "username": foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '1d'}
    ) 

    //update the foundUser with a refreshToken
    UsersDB.setUsers([
        {...foundUser, refreshToken}, 
        ...UsersDB.users.filter((user) => user.username !== foundUser.username)
    ])
    /* 
        return the token to the front & remeber to keep it in memory / as httpOnly cookie wc is not 
        accessible by js
        A cookie is always sent with every request but httpOnly cookies are not accesible to js
    */
    res.cookie('jwt', refreshToken, {httpOnly: true, maxAge: 24*60*60*1000})
    res.status(200).json({accessToken})
}

const genAccessToken = (req, res) => {
    const cookies =  req.cookies
    console.log(cookies)
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken =  cookies.jwt

    const foundUser =  UsersDB.users.find((user) => user.refreshToken === refreshToken)
    if(!foundUser) res.sendStatus(403)

    jwt.verify(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) res.sendStatus(403)
            const accessToken =  jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken })
        }
    );
}

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
    handleRegistration,
    handleLogin,
    genAccessToken,
    handleLogout
}