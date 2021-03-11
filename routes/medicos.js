/**
 * Medicos
 * ruta: /api/medicos
 */
 const { Router } = require('express');
 const { check } = require('express-validator');
 const { validarCampos } = require('../middlewares/validar-campos');

 const { validarJWT } = require('../middlewares/validar-jwt');
 
 const { 
    getMedico,
    crearMedico,
    editarMedico,
    eliminarMedico
 } = require('../controllers/medicos');

 const router = Router();
 
 /**
 * Listado de medicos
 * Necesita token
 */
 router.get( '/', getMedico );
 
 /**
 * Crear un medico
 * @body data del medico
 * Necesita token
 */
 router.post( '/', 
     [
        validarJWT,
        check('nombre', 'El nombre del medico es obligatorio').notEmpty(),
        check('hospital', 'El uid del hospital es obligatorio').notEmpty(),
        check('hospital', 'El uid del hospital no es un mongoId valido').isMongoId(),
        validarCampos
     ],
     crearMedico
 );
 
 /**
 * Editar medico
 * @param id uid de medico
 * @body data del medico
 * Necesita token
 */
 router.put( '/:id',
     [],
     editarMedico 
);
 
/**
 * Eliminar medico
 * @param id uid de medico
 * @body data del medico
 * Necesita token
 */
 router.delete( '/:id', eliminarMedico );
 
 module.exports = router;