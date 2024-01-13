const express = require('express')
const router = express.Router()
const path = require('path')
const { handleRegistration, handleLogin } = require('../controller/logoutController')


// register
// router.post('/', handleRegistration)
// login
//router.post('/login', handleLogin)
//logout

module.exports = router