const express = require('express')
const app = express()
const { logger } = require('./middleware/logEvent')
const errorHandler  = require('./middleware/errorHandler')
const path =  require('path')
const PORT = process.env.PORT || 3000
const cors =  require('cors')

//custom middleware
app.use(logger)

// custom middleware
app.use(express.urlencoded({extended: false})) // gets form data
app.use(express.json()) // gets json data
app.use(express.static(path.join(__dirname, '/public'))) // serve static files

// third party middleware
const allowedList = ['http://127.0.0.1:3000', 'https://regex101.com', 'http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedList.indexOf(origin)!== -1 || !origin) { //only in development should you allow !origin
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 2000
}
app.use(cors(corsOptions))

app.get('^/$|index(.html)?', (req, res) => {
    // ^/$|index(.html)? = start with / and end with / or index.html/ index, allows / or /index.html or index in url
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html')) /* */
    // res.send('Hello World!')
})


app.all('*', (req, res) => { // catch all route
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))   
})

// class MyEmitter extends EventEmitter {}

// const myEmitter = new MyEmitter();
// myEmitter.on('logEvent', (msg) => logEvent(msg)); // listen to log event

// myEmitter.emit('logEvent', "log event emited"); // emit log event


// const server = http.createServer((req, res) => {
//     console.log(req.url, req.method)
// })

// error handling for the app
app.use(errorHandler)
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))