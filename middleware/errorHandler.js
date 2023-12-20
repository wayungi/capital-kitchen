
const { logEvents } = require('./logEvent')


const errorHandler = (err, req, res) => {
    logEvent(`${error.name}\t${error.message}`, 'errorLog.txt')
    console.error(err.stack)
    res.status(500).send(err.message)
}

module.exports = errorHandler
