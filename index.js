const express = require('express')
const app = express()
const { logger } = require('./middleware/logEvent.js')
const path =  require('path')
const PORT = process.env.PORT || 3000

//custom middleware
app.use(logger)

// middleware
app.use(express.urlencoded({extended: false})) // gets form data
app.use(express.json()) // gets json data
app.use(express.static(path.join(__dirname, '/public'))) // serve static files
app.get('^/$|index(.html)?', (req, res) => {
    // ^/$|index(.html)? = start with / and end with / or index.html/ index, allows / or /index.html or index in url
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html')) /* */
    // res.send('Hello World!')
})


app.get('/*', (req, res) => { // catch all route
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))   
})

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('logEvent', (msg) => logEvent(msg)); // listen to log event

// myEmitter.emit('logEvent', "log event emited"); // emit log event


// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method)
// })

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))