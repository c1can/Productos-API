require('dotenv').config()
const jwt = require('jsonwebtoken')


const auth = (req, res, next) => {
    const token = req.headers['x-access-token']

    if(!token) {
        return res.status(403).send('Usuario no autenticado')
    }

    try {
        const decode = jwt.verify(token, process.env.KEY)
        req.user = decode
    } catch (error) {
        return res.status(401).send('Token Invalido')
    }
    
    return next()
}


module.exports = auth

