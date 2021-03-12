/**
 * Uploads
 * ruta: /api/todo
 */
 const { Router } = require('express');
 const exFileUpload = require('express-fileupload');

 const { fileUpload, retornarImagen } = require('../controllers/uploads');
 const { validarJWT } = require('../middlewares/validar-jwt');
 

 const router = Router();
 
 router.use(exFileUpload());


 /**
 * Carga de archivo
 * @param tipo tabla a la que se cargara
 * @param id id del documentos al que se le cargara
 * Necesita token
 */
 router.put( '/:tipo/:id', validarJWT, fileUpload );
 
 router.get( '/:tipo/:foto', validarJWT, retornarImagen );

 
 module.exports = router;