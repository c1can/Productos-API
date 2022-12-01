const productModel = (id, producto, marca, linea, precio, stock) =>{
    const model = {
        id: id,
        producto: producto,
        marca: marca,
        linea: linea,
        precio: precio,
        stock: stock,
        eliminado: false
    }
    return model
}

module.exports = {productModel}