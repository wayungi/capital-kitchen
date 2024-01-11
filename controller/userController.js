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

const handleRegistration = async(req, res) => {
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
    console.log(UsersDB.users)
}

module.exports = {handleRegistration}