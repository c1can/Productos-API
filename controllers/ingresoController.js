const obj = require('../data/productos')
const obj1 = require('../data/ingresos')


const addIngreso = (req, res) => {
    const { producto, cantidad } = req.body

    obj.productos.forEach(product => {
        if(product.id === producto) {
            product.stock += cantidad
        }
        console.log('not working') //chequear esto
    })

    const newIngreso = {
        producto: producto,
        cantidad: cantidad
    }

    obj1.ingresos = [...obj1.ingresos, newIngreso]
    //agregar el ingreso a un array osea al global
    res.status(200).send('Stock agregado correctamente')
}

module.exports = { addIngreso }