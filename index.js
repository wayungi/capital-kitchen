const { log } = require('util');
const logEvent = require('./logEvent.js')
const EventEmitter =  require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('logEvent', (msg) => logEvent(msg)); // listen to log event

myEmitter.emit('logEvent', "log event emited"); // emit log event
