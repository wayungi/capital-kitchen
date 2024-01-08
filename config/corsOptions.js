const allowedList = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5173/',
    'http://127.0.0.1:5173/',
    'https://www.google.com/'
]

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

module.exports = corsOptions
