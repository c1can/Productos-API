const obj = require('../data/productos')
const { ventaModel } = require('../dataModels/ventaModel')
const { v4: uuid } = require('uuid')
const objVentas = require('../data/ventas')

const addVenta = (req, res) => {
    const { ventas } = req.body // [{producto, cantidad}...]

    let total = 0

    obj.productos.forEach(producto => {
        ventas.forEach(venta => {
            if(venta.producto === producto.id) {
                total += producto.precio
                total *= venta.cantidad
                producto.stock -= venta.cantidad
            }
        })
    })

    const newVenta = ventaModel(uuid(), total, ventas)

    objVentas.ventas = [...objVentas.ventas, newVenta]

    //console.log(ventas)
    //console.log(total)
    res.status(200).json(newVenta)
}

module.exports = { addVenta }
