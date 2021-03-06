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

// merubah data berdasarkan id
exports.update = (req, res) => {

    let id = req.body.id
    let nim = req.body.nim
    let nama = req.body.nama
    let jurusan = req.body.jurusan

    connection.query(`UPDATE mahasiswas SET nim = ?, nama = ?, jurusan = ? WHERE id = ?`, [nim, nama, jurusan, id],
        (error, rows, fields) => {
            if (error) {
                console.log(error)
            } else {
                response.ok('Berhasil Merubah data', res)
            }
        })
}

// membuat hapus data
exports.destroy = (req, res) => {

    let id = req.body.id

    connection.query(`DELETE FROM mahasiswas  WHERE id = ?`, [id],
        (error, rows, fields) => {
            if (error) {
                console.log(error)
            } else {
                response.ok('Berhasil Menghapus data', res)
            }
        })
}

// tampilkan mata kuliah group
exports.show_group_mata_kuliah = (req, res) => {
    connection.query(`
        SELECT 
        m.id,
        m.nim,
        m.nama,
        m.jurusan,
        mk.mata_kuliah,
        mk.sks
        FROM krs AS k
        JOIN mahasiswas AS m ON m.id = k.mahasiswa_id
        JOIN mata_kuliah AS mk ON mk.id = k.mata_kuliah_id
        WHERE k.mata_kuliah_id = mk.id
        AND k.mahasiswa_id = m.id
        ORDER BY m.id
    `, (error, rows, fields) => {
        if (error) {
            console.log(error)
        } else {
            response.nested(rows, res)
        }
    })
}