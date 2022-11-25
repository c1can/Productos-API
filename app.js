require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')


const PORT = process.env.PORT

app.use(express.json())
routes(app)

app.listen(PORT, () => {
    console.log(`servidor creado en http://localhost:${PORT}`)
})


