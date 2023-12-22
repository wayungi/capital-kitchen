const express = require('express')
const app = express()
const { logger } = require('./middleware/logEvent')
const errorHandler  = require('./middleware/errorHandler')
const path =  require('path')
const PORT = process.env.PORT || 3000
const cors =  require('cors')
const corsOptions = require('./config/corsOptions')

app.use(logger)
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(path.join(__dirname, '/public')))

// routing
app.use('/restaurants', require('./routes/restaurants'))
app.use('/menu', require('./routes/menu'))
app.use('/auth', require('./routes/auth'))
app.use('/users', require('./routes/users'))
app.use('/orders', require('./routes/orders'))
app.use(cors(corsOptions))

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