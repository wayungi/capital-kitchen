const express = require('express')
const app = express()
const { logger } = require('./middleware/logEvent')
const errorHandler  = require('./middleware/errorHandler')
const path =  require('path')
const PORT = process.env.PORT || 3000
const cors =  require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')

app.use(logger)
app.use(cors())

app.use(express.urlencoded({extended: false})) // gets form data
app.use(express.json()) // gets json data
app.use(cookieParser()) // middleare for cookies
app.use(express.static(path.join(__dirname, '/public'))) // serve static files
app.use('/restaurants', require('./routes/restaurants'))
app.use('/menu', require('./routes/menu'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refreshToken'))


app.get('^/$|index(.html)?', (req, res) => {
    // ^/$|index(.html)? = start with / and end with / or index.html/ index, allows / or /index.html or index in url
    // res.sendFile('./views/index.html', { root: __dirname })
    res.sendFile(path.join(__dirname, 'views', 'index.html')) /* */
    // res.send('Hello World!')
})

app.all('*', (req, res) => { // catch all route
    res.status(404)
    if(req.accepts('html'))  {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({error: 'Not found'})
    } else {
        res.type('txt').send('Not found')
    }
})

app.use(errorHandler)
app.listen(PORT, () => console.log(`server is running on port ${PORT}`))