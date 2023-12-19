const {format} = require('date-fns')
const {v4: uuid} = require('uuid')
const path =  require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvent = async (message) => {
    const dateTime = `${format(new Date(), 'do-MMM-y \t HH:mm:ss')}`
    const logRecord = `${dateTime}\t${uuid()}\t${message}`
    console.log(logRecord)
    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))){
            fs.mkdirSync(path.join(__dirname, 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'log.txt'), logRecord + '\n')
    } catch(err) {
        console.log(err)
    }

}

module.exports = logEvent

