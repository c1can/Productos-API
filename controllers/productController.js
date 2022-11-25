const objProduct = require('../data/data')
const model = require('../dataModels/productModel')


const addProduct = (req, res) => {
    const content = req.body
    const {marca, nombre, precio, idProducto, stock} = content

    const ids = objProduct.productos.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = model.productModel(maxId + 1, marca, nombre, precio, idProducto, stock)

    objProduct.productos = [...objProduct.productos, newProduct]

    res.status(301).json(newProduct)
}

//todo agregar validacion si el usuario no agrega un producto

module.exports = {addProduct}