
const { logEvent } = require('./logEvent')


const errorHandler = (err, req, res, next) => {
    logEvent(`${err.name}\t${err.message}`, 'errorLog.txt')
    return res.status(500).send(err.message)
    next()
}

module.exports = errorHandler
