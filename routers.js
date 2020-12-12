'use strict'

module.exports = (app) => {
    let controller = require('./controller')

    app.route('/').get(controller.index)
    app.route('/show').get(controller.show)
}