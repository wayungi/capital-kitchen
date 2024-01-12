const express = require('express')
const router =  express.Router()

const { genAccessToken } = require('../controller/userController')


router.route('/').get(genAccessToken)


module.exports =  router