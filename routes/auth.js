const express = require('express')
const router = express.Router()
const path = require('path')
const { handleRegistration } = require('../controller/userController')


// create account
router.post('/', handleRegistration)


// login


//logout

module.exports = router