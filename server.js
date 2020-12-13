const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const PORT = "3000"

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

// panggil routers
var routers = require('./routers')
routers(app)

// daftarkan route dari index
app.use('/auth', require('./middleware'))

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})