const express = require('express')
const router = express.Router()
const handleRegistration = require('../controller/registerControlletr')

router.post('/', handleRegistration)

module.exports = router