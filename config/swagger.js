const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('swagger-jsdoc')


const options = {
    definition: {
        openapi: '3.0.0',
        info: {title: 'API-Deportes-LevelUp', version: '1.0.0'},
    },
    apis: ['./routes/routes.js']
}

const swaggerSpec = swaggerDocs(options)


const swagger = (app) => {
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
}

module.exports = { swagger }