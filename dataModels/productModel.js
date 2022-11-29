const { v4: uuid } = require('uuid')


const productModel = (id, marca, nombre, precio, stock) => {
    const mainModel = {
        id: id,
        marca: marca,
        producto: {
            nombre: nombre,
            precio: precio,
            idProducto: uuid(),
            stock: stock
        }
    }

    return mainModel
}

module.exports = {productModel}