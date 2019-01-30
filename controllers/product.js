'use strict'

const Product = require("../models/product")

function getProduct(req, res){
  let productID = req.params.id

  Product.findById(productID, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!product) return res.status(404).send({ message: "El producto no existe.." })

    res.status(200).send({ product })
  })
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) return res.status(500).send({ message: `Error al realizar la petición ${err}` })
    if (!products) return res.status(404).send({ message: "No existen prodcutos!" })

    res.send(200, { products })
  })
}

function addProduct(req, res) {
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStore) => {
    if (err) res.status(500).send({ mensaje: 'Error al guardar' })
    res.status(200).send({ product: productStore })
  })
}


function updateProduct(req, res) {
  let productID = req.params.id
  let body = req.body
  Product.findByIdAndUpdate(productID, body, (err, productUpdated) => {
    if (err) res.status(500).send({ mensaje: 'Error al actualizar el producto' })

    res.status(200).send({ product: productUpdated })
  })
}


function deleteProduct(req, res) {
  let productID = req.params.id
  Product.findById(productID, (err, product) => {
    if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })
    product.remove(err => {
      if (err) return res.status(500).send({ message: `Error al borrar el producto: ${err}` })
      res.status(200).send({ message: 'Prodcuto borrado exitosamente!' })
    })

  })
}

module.exports = {
  getProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct
}