const objProduct = require('../data/data')
const model = require('../dataModels/productModel')



const getId = (req, res) => {
    const {id} = req.params
    const filteredProduct = objProduct.productos.filter(product => product.id === +id)

    res.status(200).json(filteredProduct)

}

const addProduct = (req, res) => {
    const content = req.body
    const {marca, nombre, precio, stock} = content

    if(!(marca && nombre && precio && stock)) {
        return  res.status(400).send('Ingresa todos los datos requeridos')
    }

    const ids = objProduct.productos.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = model.productModel(maxId + 1, marca, nombre, precio, stock)

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

const updateProduct = (req, res) => {
    const {id} = req.params
    const content = req.body
    const { marca, nombre, precio, stock} = content
    const match = objProduct.productos.find(product => product.id === +id)
    console.log(id)
    if(!match) {
        res.status(400).send('producto no encontrado')
    }
    
    if(!(marca || nombre || precio || stock)) {
        res.status(400).send('Debes actualizar al menos un dato!')
    }

    const edited = objProduct.productos.map(product => {
        if(product.id === +id) {
            return {
                ...product,
                marca: marca || product.marca,
                producto: {
                    nombre: nombre || product.producto.nombre,
                    precio: precio || product.producto.precio,
                    stock: stock || product.producto.stock 
                }
            }
        }else {
            return product
        }
    })

    objProduct.productos = edited

    res.status(200).send('Producto editado')

}

module.exports = {addProduct, deleteProduct, getId, updateProduct}