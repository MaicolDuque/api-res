'use strict'

const express = require("express")
const productController = require("../controllers/product")
const api = express.Router()


//Visualiar todos los productos
api.get('/product', productController.getProducts)
//Visuazliar un producto
api.get('/product/:id', productController.getProduct)
//Insertar
api.post("/product", productController.addProduct)
//Actualizar
api.put("/product/:id", productController.updateProduct)
////Eliminar
api.delete("/product/:id", productController.deleteProduct)


module.exports = api