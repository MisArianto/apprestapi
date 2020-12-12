var mysql = require('mysql')

// membuat connection database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_rest_api'
})

conn.connect((err) => {
    if (err) throw console.log(err)
    console.log('mysql connection')
})

module.exports = conn