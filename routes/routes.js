const auth = require('../middlewares/auth')
const { login, register } = require('../controllers/userController')
const {getId, addProduct, deleteProduct, updateProduct} = require('../controllers/productController')
const data = require('../data/data')

const routes = (app) => {
    /**
 * @openapi
 * components:
 *  schemas:
 *      item:
 *          type: object
 *          properties:
 *              id:
 *               type: number
 *              marca:
 *               type: string
 *              producto: 
 *               type: object
 *               properties:
 *                nombre:
 *                 type: string
 *                precio: 
 *                 type: string
 *                idProducto:
 *                 type: string
 *                stock:
 *                 type: boolean  
 *                        
 * 
 */

    app.post('/register', register)
    /**
 * @openapi
 * /register:
 *  post: 
 *   summary: Registra un nuevo usuario
 *   requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                        type: string
 *                      email: 
 *                        type: string
 *                      password: 
 *                        type: string    
 *   responses: 
 *      201: 
 *       description: Retorna tu usuario creado
 *       content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties: 
 *                      name:
 *                        type: string
 *                      email:
 *                        type: string
 *                      password: 
 *                        type: string    
 *                   
 *      400: 
 *       description: Ingresa todos los datos requeridos
 *       content: 
 *          text/plain:
 *              schema: 
 *                  type: string
 *                  example: Ingresa tus datos!  
 *      404: 
 *       description: Usuario ya registrado
 *       content: 
 *          text/plain:
 *             schema: 
 *              type: string
 *              example: Usuario ya registrado!      
 */
    app.post('/login', login)
    /**
 * @openapi
 * /login:
 *  post:
 *   summary: Iniciar sesion con un usuario ya registrado.
 *   requestBody: 
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  type: object
 *                  properties:
 *                      email: 
 *                       type: string
 *                      password: 
 *                       type: string
 *   responses: 
 *      200: 
 *        description: Retorna un token  
 *        content: 
 *          text/plain:
 *              schema:
 *                  type: object
 *                  properties: 
 *                      token:
 *                        type: string
 *                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"        
 *      404: 
 *        description: Devuelve un mensaje de error si no ingresas nada  
 *        content: 
 *          text/plain: 
 *              schema: 
 *                type: string
 *                example: Ingresa tu email y contraseña! 
 *      403: 
 *        description: Credenciales invalidas
 *        content: 
 *          text/plain: 
 *              schema: 
 *                  type: string
 *                  example: Contraseña o usuario incorrecto! 
 */
    app.get('/', (req, res) => res.status(200).send('Bienvenido'))
    /**
 * @openapi
 * /:
 *  get:
 *   summary: Mensaje de bienvenida
 *   responses: 
 *      200: 
 *       description: Devuelve mensaje de bienvenida
 *       content: 
 *          text/plain:
 *              schema: 
 *                  type: string
 *                  example: Bienvenido! 
 */
    app.get('/productos', auth, (req, res) => res.status(200).json(data))
    /**
 * @openapi
 * /productos:
 *  get:
 *   summary: Todos los productos
 *   parameters: 
 *      - in: header
 *        name: x-access-token
 *        schema: 
 *          type: string
 *        required: true  
 *   responses:
 *      200:
 *       description: Retorna array de productos
 *       content: 
 *          application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                     $ref: '#components/schemas/item'
 */

    app.get('/productos/:id', auth,  getId)
    /**
 * @openapi
 * /productos/{id}:
 *  get:
 *   summary: Devuelve un producto segun dado el id
 *   parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: Agrega un id
 *        schema:
 *          type: integer
 *      - name: x-access-token
 *        in: header
 *        schema: 
 *          type: string
 *        description: Ingresa tu token!
 *        required: true
 *   responses: 
 *      200: 
 *       description: Devulve el producto con el id encontrado
 *       content: 
 *          application/json: 
 *            schema: 
 *              type: array
 *              items:
 *               $ref: '#components/schemas/item'
 *                       
 */
    app.post('/productos', auth, addProduct)
    /**
 * @openapi
 * /productos:
 *  post:
 *    summary: Añadir productos
 *    requestBody: 
 *      required: true
 *      content: 
 *          application/json:
 *           schema: 
 *              type: object
 *              properties:
 *                  marca: 
 *                     type: string
 *                  nombre: 
 *                     type: string
 *                  precio: 
 *                     type: string
 *                  stock:
 *                     type: boolean
 *    parameters: 
 *      - name: x-access-token
 *        in: header
 *        description: Agrega tu token
 *        required: true
 *    responses: 
 *      200: 
 *        description: Devuelve un mensaje de exito y añade el producto
 *        content: 
 *          text/plain:
 *            schema: 
 *              type: string
 *              example: Tarea añadida!
 */
    app.delete('/productos/:id', auth, deleteProduct)
    /**
 * @openapi
 * /productos/{id}:
 *  delete: 
 *    summary: Eliminar un producto
 *    parameters: 
 *      - name: x-access-token
 *        in: header
 *        required: true
 *      - name: id
 *        in: path
 *        required: true
 *    responses: 
 *      200: 
 *        description: Devulve un mensaje de exito y elimina el producto 
 *        content: 
 *          text/plain: 
 *             schema: 
 *               type: string
 *               example: Tarea eliminada!
 */

    app.put('/productos/:id', auth, updateProduct)
    /**
 * @openapi
 * /productos/{id}:
 *  put:
 *   summary: Editar un producto
 *   requestBody: 
 *      required: true
 *      content: 
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *                marca: 
 *                   type: string
 *                nombre: 
 *                   type: string
 *                precio: 
 *                   type: string
 *                stock: 
 *                   type: boolean
 *   parameters: 
 *    - name: x-access-token
 *      in: header
 *      required: true
 *    - name: id
 *      in: path
 *      required: true 
 *   responses: 
 *    200: 
 *     content:
 *       text/plain: 
 *          schema:
 *             type: string
 *             example: Producto correctamente editado!  
 */
    app.use((req, res) => {
        res.status(404).json({
            error: 'error'
        })
    })
}

module.exports = routes