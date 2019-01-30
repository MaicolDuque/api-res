'use strict'

const express = require("express") //Es un framework para node js
const bodyParser = require("body-parser") //Body parser es un middleware
const mongoose = require("mongoose")

const Product = require("./models/product")

const productController = require("./controllers/product")

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//Visualiar todos los productos
app.get('/api/product', productController.getProducts)

//Visuazliar un producto
app.get('/api/product/:id', productController.getProduct)

//Insertar
app.post("/api/product", productController.addProduct)

//Actualizar
app.put("/api/product/:id", productController.updateProduct)


////Eliminar
app.delete("/api/product/:id", productController.deleteProduct)



//conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if(err) throw err
    console.log('Conexión a la base de datos establecida...')

    
    app.listen(port, () => {
        console.log(`API REST Escuchando en puerto ${port}`)
    })
})
