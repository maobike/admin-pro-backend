require('dotenv').config();

const cors = require('cors');
const express = require('express');

const { dbConnection } = require('./database/config');

const port = process.env.PORT;

// Crear el server express
const app = express();

// Configurar CORS
app.use(cors())

// Lectura y parseo del body
app.use( express.json() );

// Base de datos
dbConnection();

// Rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


app.listen( port, () => {
    console.log(`Servidor corriendo por el puerto: ${ port }`);
})

