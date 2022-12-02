const obj = require('../data/marcas')
const { brandModel } = require('../dataModels/brandModel')

const addBrand = (req, res) => {
    const content = req.body
    const { marca } = content

    if(!marca) {
        return  res.status(400).send('Ingresa todos los datos requeridos')
    }

    const ids = obj.marcas.map(marca => marca.id)
    const maxId = Math.max(...ids)

    const newProduct = brandModel(maxId + 1, marca)

    obj.marcas = [...obj.marcas, newProduct]

    res.status(301).send('Tarea añadida!')
}


module.exports = { addBrand }