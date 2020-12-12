'use strict'

module.exports = (app) => {
    let my_json = require('./connection')

    app.route('/')
        .get(my_json.index)
}