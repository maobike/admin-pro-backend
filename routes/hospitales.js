/**
 * Hospitales
 * ruta: /api/hospital
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { 
    getHospital,
    crearHospital,
    editarHospital,
    eliminarHospital
 } = require('../controllers/hospitales');

 const router = Router();
 
 /**
 * Listado de hospitales
 * Necesita token
 */
 router.get( '/', getHospital );
 
 /**
 * Crear un hospital
 * @body data del hospital
 * Necesita token
 */
 router.post( '/', 
     [
        validarJWT,
        check('nombre', 'El nombre del hospital es obligatorio').notEmpty(),
        validarCampos
     ],
     crearHospital
 );
 
 /**
 * Editar hospital
 * @param id uid de hospital
 * @body data del hospital
 * Necesita token
 */
 router.put( '/:id',
     [],
     editarHospital
);
 
/**
 * Eliminar hospital
 * @param id uid de hospital
 * @body data del hospital
 * Necesita token
 */
 router.delete( '/:id', eliminarHospital );
 
 module.exports = router;