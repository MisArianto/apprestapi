'use strict'

module.exports = (app) => {
    let my_json = require('./controller')

    app.route('/').get(my_json.index)
}