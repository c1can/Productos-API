const ventaModel = (id, total, producto ) => {
    return {
        id: id,
        total: total,
        productos: producto
    }
}

module.exports = { ventaModel }