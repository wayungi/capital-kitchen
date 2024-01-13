const UsersDB =  {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users =  data
    }
}

//jwt
const jwt =  require('jsonwebtoken')
require('dotenv').config()

const handleAccessToken = (req, res) => {
    const cookies =  req.cookies
    if(!cookies?.jwt) return res.sendStatus(401)
    const refreshToken =  cookies.jwt
    const foundUser =  UsersDB.users.find((user) => user.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403)
    jwt.verify(
        {"username": foundUser.username},
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if(err || foundUser.username !== decoded.username) return res.sendStatus(403)
            const accessToken =  jwt.sign(
                {"username": decoded.username},
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            )
            res.json({ accessToken })
        }
    );
}

module.exports = handleAccessToken