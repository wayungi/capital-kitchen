const jwt =  require('jsonwebtoken')
require('dotenv').config()


const verifyJWT = (req, res, next) => {
    const authHeader =  req.headers['authorization'] || req.headers['Authorization']
    if(!authHeader?.startsWith("Bearer"))return  res.sendStatus(401) // Not correctly formed token
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) res.sendStatus(403)
        req.user = decoded.UserInfo.username
        req.roles =  decoded.UserInfo.roles
        next()
    })
}

module.exports = { verifyJWT }