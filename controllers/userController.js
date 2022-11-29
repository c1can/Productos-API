require('dotenv/config')
const usersData = require('../dataModels/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let newUser = {}
let users = []

const register = async (req, res) => {
    try {
    //no hay nada
        if (!req.body) {
            res.status(400).send('Ingresa tu nombre, email y password')
        }

        const { name, email, password } = req.body

        //si no se pasa una
        if (!(name && email && password)) {
            res.status(400).send('Ingresa todos los datos requeridos!')
        }

        const userExists = users.find((user) => user.email === email)

        //si el registro ya existe
        if (userExists) {
            res.status(404).send('Usuario ya existente')
        }

        const encryptPassword = await bcrypt.hash(password, 10)
        newUser = usersData.User(name, email, encryptPassword)

        users = [...users, newUser]
    
    } catch (error) {
        console.log(error)
    }
    return res.status(201).json(newUser)
}

const login = async (req, res) => {
    try {
        if(!req.body) {
            res.status(400).send('Ingresa tus datos!')
        }
        const {email, password} = req.body

        if(!(email && password)) {
            res.status(404).send('Ingresa tu email y contraseña!')
        }
        
        const user = users.find(usr => usr.email === email)

        if(user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({email}, process.env.KEY, {expiresIn: '2h'})
            user.token = token // crea una propiedad token y le agrega el token
            res.status(200).json({token: token})
        }else {
            res.status(403).send('credenciales invalidas')
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = { register, login }
