'use strict'

const express = require("express") //Es un framework para node js
const bodyParser = require("body-parser") //Body parser es un middleware

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/product', (req, res) => {
    res.send(200, { products: [] })
})

app.get('/api/product/:id', (req, res) => {

})

app.post("/api/product", (req, res) => {
    console.log(req.body)
    res.status(200).send({ mensaje: "el productos se ha recibido.." })
})

app.put("/api/product/:id", (req, res) => {

})

app.delete("/api/product/:id", (req, res) => {

})




app.listen(port, () => {
    console.log(`API REST Escuchando en puerto ${port}`)
})