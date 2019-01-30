'use strict'

const mongoose = require("mongoose")
const app = require("./app")
const config = require("./config")

//conectar a la base de datos
mongoose.connect(config.db, (err, res) => {
    if(err) throw err
    console.log('Conexión a la base de datos establecida...')

    
    app.listen(config.port, () => {
        console.log(`API REST Escuchando en puerto ${config.port}`)
    })
})
