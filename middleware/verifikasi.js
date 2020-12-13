const jwt = require('jsonwebtoken')
const config = require('../config/secret')

const verifikasi = () => {
    return (req, rest, next) => {
        let role = req.body.role
        // cek authorization header
        let tokenWithBearer = req.headers.authorization
        if (tokenWithBearer) {
            let token = tokenWithBearer.split(' ')[1]
            // verifikasi
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) {
                    return rest.status(401).send({
                        auth: false,
                        message: 'Token tidak terdaftar'
                    })
                } else {
                    if (role == 2) {
                        req.auth = jwt.decoded
                        next()
                    } else {

                        return rest.status(401).send({
                            auth: false,
                            message: 'Gagal mengautorisasi role anda'
                        })
                    }
                }
            })
        } else {
            return rest.status(401).send({
                auth: false,
                message: 'Token tidak teraftar'
            })
        }
    }
}

module.exports = verifikasi