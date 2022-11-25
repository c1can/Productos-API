const productModel = (id, marca, nombre, precio, idProducto, stock) => {
    const mainModel = {
        id: id,
        marca: marca,
        producto: {
            nombre: nombre,
            precio: precio,
            idProducto: idProducto,
            stock: stock
        }
    }

    return mainModel
}

module.exports = {productModel}