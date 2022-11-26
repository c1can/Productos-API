const objProduct = require('../data/data')
const model = require('../dataModels/productModel')


const addProduct = (req, res) => {
    const content = req.body
    const {marca, nombre, precio, idProducto, stock} = content

    if(!(marca && nombre && precio && idProducto && stock)) {
        res.status(400).send('Ingresa todos los datos requeridos')
    }

    const ids = objProduct.productos.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = model.productModel(maxId + 1, marca, nombre, precio, idProducto, stock)

    objProduct.productos = [...objProduct.productos, newProduct]

    res.status(301).json(newProduct)
}

const deleteProduct = (req, res) => {
    const { id }= req.params

    const filteredArr = objProduct.productos.filter(product => product.id === +id)

    if(filteredArr.length === 0) {
        res.status(400).send('id no encontrado')
    }

    objProduct.productos = objProduct.productos.filter(product => product.id !== +id)
    res.status(201).send(`Producto no. ${+id} eliminados`)
}

module.exports = {addProduct, deleteProduct}