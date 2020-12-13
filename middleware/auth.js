const connection = require('../connection')
const mysql = require('mysql')
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)
const response = require('../response')
const jwt = require('jsonwebtoken')
const config = require('../config/secret')
const ip = require('ip')

// controller untuk registrasi
exports.registrasi = (req, res) => {
    let post = {
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        role: req.body.role,
        tanggal_daftar: new Date()
    }

    let query = "SELECT email FROM users ?? WHERE ?? = ?"
    let table = ["users", "email", post.email]

    query = mysql.format(query, table)

    connection.query(query, (error, rows) => {
        if (error) {
            console.log(error)
        } else {
            if (rows.length == 0) {
                let query = "INSERT INTO ?? SET ?"
                let table = ['users']
                query = mysql.format(query, table)
                connection.query(query, post, (error, rows) => {
                    if (error) {
                        console.log(error)
                    } else {
                        response.ok('Berhasil menambahkan data user baru', res)
                    }
                })
            } else {
                response.ok('Email Sudah terdaftar', res)
            }
        }
    })
}