'use strict'

module.exports = (app) => {
    let controller = require('./controller')

    app.route('/').get(controller.index)
    app.route('/show').get(controller.show)
    app.route('/edit/:id').get(controller.edit)
    app.route('/store').post(controller.store)
    app.route('/update').put(controller.update)
    app.route('/delete').delete(controller.destroy)


    app.route('/show-mata-kuliah').get(controller.show_group_mata_kuliah)
}