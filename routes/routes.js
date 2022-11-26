const auth = require('../middlewares/auth')
const controller = require('../controllers/userController')
const productsController = require('../controllers/productController')
const data = require('../data/data')


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
    app.get('/productos', auth, (req, res) => {
        res.status(200).json(data)
    })
    app.get('/productos/:id', auth, (req, res) => {
        return productsController.getId(req, res)
    })
    app.post('/productos', auth, (req, res) => {
        return productsController.addProduct(req, res)
    })
    app.delete('/productos/:id', auth, (req, res) => {
        return productsController.deleteProduct(req, res)
    })
    app.use(auth,(req, res) => {
        res.status(404).json({
            error: 'error'
        })
    })
}

module.exports = routes