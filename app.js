require('dotenv').config()
const express = require('express')
const { swagger } = require('./config/swagger')
const app = express()
const routes = require('./routes/routes')



const PORT = process.env.PORT

app.use(express.json())

swagger(app)
routes(app)

app.listen(PORT, () => {
    console.log(`servidor creado en http://localhost:${PORT}`)
})


