'use strict'

exports.ok = (data, res) => {
    let output = {
        'status': 200,
        'data': data
    }

    res.json(output)
    res.end()
}

// response untuk nested
exports.nested = (values, res) => {
    // lakukan akumulasi
    const hasil = values.reduce((akumulasikan, item) => {
        // tentukan key group
        if (akumulasikan[item.nama]) {
            // buat variabel group nama mahasiswa
            const group = akumulasikan[item.nama]

            // cek jika isi array adalah mata kuliah
            if (Array.isArray(group.mata_kuliah)) {
                // tambahkan value ke dalam group mata kuliah
                group.mata_kuliah.push(item.mata_kuliah)
            } else {
                group.mata_kuliah == [group.mata_kuliah, item.mata_kuliah]
            }
        } else {
            akumulasikan[item.nama] = item
        }

        return akumulasikan
    }, {})

    let output = {
        'status': 200,
        'data': hasil
    }

    res.json(output)
    res.end()
}