'use strict'

const express = require("express") //Es un framework para node js
const bodyParser = require("body-parser") //Body parser es un middleware
const mongoose = require("mongoose")

const Product = require("./models/product")

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/product', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
        if (!products) return res.status(404).send({ message: "No existen prodcutos!" })
        
        res.send(200, { products })
    })
})

app.get('/api/product/:id', (req, res) => {
    let productID = req.params.id 

    Product.findById(productID, (err, product) => {
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!product) return res.status(404).send({message: "El producto no existe.."})

        res.status(200).send({product})
    })
})

app.post("/api/product", (req, res) => {
    console.log('POST  /api/product')
    console.log(req.body)

    let product = new Product()
    product.name    = req.body.name
    product.picture = req.body.picture
    product.price   = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStore) => {
        if(err) res.status(500).send({mensaje: 'Error al guardar'})
        res.status(200).send({ product: productStore })
    })

})


//Actualizar
app.put("/api/product/:id", (req, res) => {
    let productID = req.params.id 
    let body = req.body 
    Product.findByIdAndUpdate(productID, body, (err, productUpdated) => {
        if (err) res.status(500).send({ mensaje: 'Error al actualizar el producto' })
        
        res.status(200).send({ product: productUpdated })        
    })
})



//Eliminar
app.delete("/api/product/:id", (req, res) => {
    let productID = req.params.id 
    Product.findById(productID, (err, product) => {
        if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })
        product.remove(err => {
            if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })            
            res.status(200).send({ message: 'Prodcuto borrado exitosamente!' })
        })

    })

})




//conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/shop', (err, res) => {
    if(err) throw err
    console.log('Conexión a la base de datos establecida...')

    
    app.listen(port, () => {
        console.log(`API REST Escuchando en puerto ${port}`)
    })
})
