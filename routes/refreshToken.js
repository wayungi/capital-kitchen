const express = require('express')
const router =  express.Router()
const handleAccessToken = require('../controller/accessTokenController')

router.route('/').get(handleAccessToken)
module.exports =  router