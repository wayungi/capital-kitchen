const express = require('express')
const router =  express.Router()
const { handleLogout } = require('../controller/userController')

router.route('/').get(handleLogout)

module.exports =  router