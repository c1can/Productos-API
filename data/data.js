const { v4 :  uuid } = require('uuid')

let productos = [
    {
        id: 1,
        marca: 'Adidas',
        producto: {
            nombre: 'pantalon',
            precio: 'Q300',
            idProducto: uuid(),
            stock: true
        }
    },
    {
        id: 2,
        marca: 'Nike', 
        producto: {
            nombre: 'Air Force 1',
            precio: 'Q700',
            idProducto: uuid(),
            stock: false
        }
    },
    {
        id: 3, 
        marca: 'Puma',
        producto: {
            nombre: 'sudadera',
            precio: 'Q350',
            idProducto: uuid(),
            stock: true
        }
    }
]


module.exports = {productos}