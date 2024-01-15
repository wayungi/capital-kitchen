const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        /*
            The roles were added to the req at login
            req.roles are the roles a user has
        */ 
        if(!req?.roles) return res.sendStatus(401) 
        const rolesArray = [...allowedRoles] // the roles required to access a route
        console.log(rolesArray)
        console.log(req.roles)
        const isAllowed =  req.roles.map((role) => rolesArray.includes(roles)).find((val) => val === true)
        if(!isAllowed) return res.sendStatus(401)
        next()
    }
}

module.exports = verifyRoles
