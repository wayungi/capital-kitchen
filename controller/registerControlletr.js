const { v4: uuidv4 } = require('uuid');
const bcrypt =  require('bcrypt')
const path = require('path')
const fsPromises =  require('fs').promises
const UsersDB =  {
    users: require('../model/users.json'),
    setUsers: function (data) {
        this.users =  data
    }
}

const handleRegistration =  async (req, res) => {
    const { username, password } =  req.body
    if(!username || !password) return res.status(400).json({'message': 'Username & Password are required'})
    const duplicate = UsersDB.users.find((person) => person.username === username)
    if(duplicate) return res.sendStatus(409) // conflict
    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)
    if(!hash) return res.sendStatus(500) 
    const newUser = {id: uuidv4(), username, password: hash}
    UsersDB.setUsers([...UsersDB.users, newUser])
    console.log(UsersDB.users)
    res.status(201).json({'message': `${newUser.username} created`})


    
}

module.exports = handleRegistration