const obj = require('../data/lineas')
const { lineaModel } = require('../dataModels/lineaModel')

const addLinea = (req, res) => {
    const content = req.body
    const { linea } = content

    if(!linea) {
        return  res.status(400).send('Ingresa todos los datos requeridos')
    }

    const ids = obj.lineas.map(linea => linea.id)
    const maxId = Math.max(...ids)

    const newLinea = lineaModel(maxId + 1, linea)

    obj.lineas = [...obj.lineas, newLinea]

    res.status(301).send('Tarea añadida!')
}

const deleteLinea = (req, res) => {
    const { id }= req.params

    const filteredArr = obj.lineas.filter(linea => linea.id === +id)

    if(filteredArr.length === 0) return res.status(400).send('id no encontrado')

    const softDelete = obj.lineas.map(linea => {
        if(linea.id === +id) {
            return {
                ...linea,
                eliminado: true
            }

        }else {
            return linea
        }
    })

    obj.lineas = softDelete
    res.status(201).send(`Producto no. ${+id} eliminado`)
}

const updateLinea = (req, res) => {
    const { id } = req.params
    const content = req.body
    const { linea } = content
    const match = obj.lineas.find(marca => marca.id === +id)
    if(!match) {
        return res.status(400).send('producto no encontrado')
    }
    
    if(linea.length === 0) {
        return res.status(400).send('Agregale otro nombre')
    }

    const edited = obj.lineas.map(line => {
        if(line.id === +id) {
            return {
                ...line,
                linea: linea || line.linea,
            }
        }else {
            return line
        }
    })

    obj.lineas = edited
    res.status(200).send(`Producto no.${id} editado`)
}

module.exports = { addLinea, deleteLinea, updateLinea}