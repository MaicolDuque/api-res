'use strict'

const express = require("express") //Es un framework para node js
const bodyParser = require("body-parser") //Body parser es un middleware
const app = express();
const api = require("./routes")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', api)



module.exports = app