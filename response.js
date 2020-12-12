'use strict'

exports.ok = (data, res) => {
    let output = {
        'status': 200,
        'data': data
    }

    res.json(output)
    res.end()
}