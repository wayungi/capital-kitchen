const jwt =  require('jsonwebtoken')
require('dotenv').config()


const verifyJWT = (req, res, next) => {
    const authHeader =  req.headers['authorization']
    if(!authHeader) res.sendStatus(401)
    // console.log(authHeader)
    const token = authHeader.split(' ')[1]
    jwt.verify(token, process.env.SECRET_ACCESS_TOKEN, (err, decoded) => {
        if(err) res.sendStatus(403)
        req.user = decoded.username
        next()
    })
}

module.exports = { verifyJWT }