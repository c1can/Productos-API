const objProduct = require('../data/data')
const model = require('../dataModels/productModel')



const getId = (req, res) => {
    const {id} = req.params

    const filteredProduct = objProduct.productos.filter(product => product.id === +id)

    res.status(200).json(filteredProduct)

}

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

    res.status(301).send('Producto correctamente agregado')
}

const deleteProduct = (req, res) => {
    const { id }= req.params

    const filteredArr = objProduct.productos.filter(product => product.id === +id)

    filteredArr.length === 0 && res.status(400).send('id no encontrado')

    objProduct.productos = objProduct.productos.filter(product => product.id !== +id)
    res.status(201).send(`Producto no. ${+id} eliminado`)
}

module.exports = {addProduct, deleteProduct, getId}