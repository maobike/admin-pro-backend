require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./database/config');

const port = process.env.PORT;

// Crear el server express
const app = express();

// Configurar CORS
app.use(cors())

// Base de datos
dbConnection();

// Rutas
app.get( '/', (req, res) => {
    res.status(200).json({
        msg: 'Listo'
    })
});


app.listen( port, () => {
    console.log(`Servidor corriendo por el puerto: ${ port }`);
})

