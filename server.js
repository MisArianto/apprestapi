const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = "3000"

// parse application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log(`Server started in port ${PORT}`)
})