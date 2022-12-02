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

const deleteBrand = (req, res) => {
    const { id }= req.params

    const filteredArr = obj.marcas.filter(product => product.id === +id)

    if(filteredArr.length === 0) return res.status(400).send('id no encontrado')

    const softDelete = obj.marcas.map(marca => {
        if(marca.id === +id) {
            return {
                ...marca,
                eliminado: true
            }

        }else {
            return marca
        }
    })

    obj.marcas = softDelete
    res.status(201).send(`Producto no. ${+id} eliminado`)
}

const updateBrand = (req, res) => {
    const { id } = req.params
    const content = req.body
    const { marca } = content
    const match = obj.marcas.find(marca => marca.id === +id)
    if(!match) {
        return res.status(400).send('producto no encontrado')
    }
    
    if(marca.length === 0) {
        return res.status(400).send('Agregale otro nombre')
    }

    const edited = obj.marcas.map(brand => {
        if(brand.id === +id) {
            return {
                ...brand,
                marca: marca || brand.marca,
            }
        }else {
            return brand
        }
    })

    obj.marcas = edited
    res.status(200).send(`Producto no.${id} editado`)
}

module.exports = { addBrand, deleteBrand, updateBrand}