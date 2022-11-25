const auth = require('../middlewares/auth')
const controller = require('../controllers/userController')


const routes = (app) => {

    app.post('/login', (req, res) => {
        return controller.login(req, res)
    })

    app.post('/register', (req, res) => {
        return controller.register(req, res)
    })

    app.get('/', auth, (req, res) => {
        res.status(200).send('bienvenido')
    })
}


module.exports = routes