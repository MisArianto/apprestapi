'use strict'

let response = require('./response')
let connection = require('./connection')

exports.index = (req, res) => {
    response.ok('Aplikasi REST API running', res)
}

// menampilkan semua data mahasiswa
exports.show = (req, res) => {
    connection.query('SELECT * FROM mahasiswas', (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

// menampilkan data mahasiswa berdasarkan id
exports.edit = (req, res) => {
    let id = req.params.id
    connection.query('SELECT * FROM mahasiswas WHERE id = ?', [id], (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.ok(rows, res)
        }
    })
}

// menambah data mahasiswa
exports.store = (req, res) => {
    let nim = req.body.nim
    let nama = req.body.nama
    let jurusan = req.body.jurusan

    connection.query(`INSERT INTO mahasiswas (nim, nama, jurusan) VALUES (?, ?, ?)`,
        [nim, nama, jurusan],
        (error, rows, fields) => {
            if (error) {
                console.log(error)
            } else {
                response.ok('Berhasil Menambah data', res)
            }
        })
}