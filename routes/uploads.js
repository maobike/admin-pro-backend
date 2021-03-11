/**
 * Uploads
 * ruta: /api/todo
 */
 const { Router } = require('express');
 const exFileUpload = require('express-fileupload');

 const { fileUpload } = require('../controllers/uploads');
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

 
 module.exports = router;