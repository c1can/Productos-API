const obj = require('../data/productos')
const { productModel } = require('../dataModels/productModel')



const getId = (req, res) => {
    const {id} = req.params
    const filteredProduct = obj.productos.find(product => product.id === +id)
    if(!filteredProduct) {
        return res.status(404).json({
            error: 'producto no encontrado'
        })
    }
    res.status(200).json(filteredProduct)

}

const addProduct = (req, res) => {
    const content = req.body
    const {producto, marca, linea, precio, stock} = content

    if(!(marca && producto && precio && stock && linea)) {
        return  res.status(400).send('Ingresa todos los datos requeridos')
    }

    const ids = obj.productos.map(product => product.id)
    const maxId = Math.max(...ids)

    const newProduct = productModel(maxId + 1, producto, marca, linea, precio, stock)

    obj.productos = [...obj.productos, newProduct]

    res.status(301).send('Tarea añadida!')
}

const deleteProduct = (req, res) => {
    const { id }= req.params

    const filteredArr = obj.productos.filter(product => product.id === +id)

    filteredArr.length === 0 && res.status(400).send('id no encontrado')

    const softDelete = obj.productos.map(producto => {
        if(producto.id === +id) {
            return {
                ...producto,
                eliminado: true
            }

        }else {
            return producto
        }
    })

    obj.productos = softDelete
    res.status(201).send(`Producto no. ${+id} eliminado`)
}

const updateProduct = (req, res) => {
    const { id } = req.params
    const content = req.body
    const { producto, marca, linea, precio, stock } = content
    const match = obj.productos.find(product => product.id === +id)
    if(!match) {
        return res.status(400).send('producto no encontrado')
    }
    
    if(!(producto || marca || linea || precio || stock)) {
        return res.status(400).send('Debes actualizar al menos un dato!')
    }

    const edited = obj.productos.map(product => {
        if(product.id === +id) {
            return {
                ...product,
                producto: producto || product.producto,
                marca: marca || product.marca,
                linea: linea || product.linea,
                precio: precio || product.precio,
                stock: stock || product.stock
            }
        }else {
            return product
        }
    })

    obj.productos = edited
    res.status(200).send('Producto editado')
}

module.exports = {addProduct, deleteProduct, getId, updateProduct}