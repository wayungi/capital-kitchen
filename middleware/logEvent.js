const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const path =  require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvent = async (message, writeTofile) => {
    const dateTime = `${format(new Date(), 'do-MMM-y \t HH:mm:ss')}`
    const logRecord = `${dateTime}\t${uuid()}\t${message}`
    try {
        if(!fs.existsSync(path.join(__dirname, '..', 'logs'))){
            fs.mkdirSync(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', writeTofile), logRecord + '\n')
    } catch(err) {
        console.log(err)
    }

}

const logger = (req, res, next) => {
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`, 'logs.txt');
    // console.log(`${req.method}\t${req.headers.origin}\t${req.url}`)
    next();
}


module.exports = { logger, logEvent }
