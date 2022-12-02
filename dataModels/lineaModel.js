const lineaModel = (id, linea) => {
    return {
        id: id,
        linea: linea,
        eliminado: false
    }
}

module.exports = { lineaModel }