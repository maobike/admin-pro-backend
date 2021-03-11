/**
 * Búsquedas
 * ruta: /api/todo
 */
 const { Router } = require('express');

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { getTodo, getCollectionTable, } = require('../controllers/busquedas');

 const router = Router();
 
 /**
 * Listado total
 * Necesita token
 */
 router.get( '/:search', validarJWT, getTodo );

 /**
 * Listado por colección y tabla
 * Necesita token
 */
 router.get( '/collection/:table/:search', validarJWT, getCollectionTable );
 
 
 module.exports = router;