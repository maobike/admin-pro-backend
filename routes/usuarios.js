/**
 * Ruta: /api/usuarios
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { 
    getUsuarios, 
    crearUsuario,
    editarUsuario,
    eliminarUsuario
    } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

/**
 * Listado de usuarios
 * Necesita token
 */
router.get( '/', validarJWT, getUsuarios );

/**
 * Crear un usuario
 *  * @body data del usuario
 * Necesita token
 */
router.post( '/', 
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
        check('email', 'El correo no es válido').isEmail(),
        validarCampos
    ],
    crearUsuario
);

/**
 * Editar usuario
 * @param id uid de usuario
 * @body data del usuario
 * Necesita token
 */
router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo no es válido').isEmail(),
        check('role', 'El rol es obligatorio').notEmpty(),
        validarCampos
    ],
    editarUsuario
);

/**
 * Eliminar usuario
 * @param id uid de usuario
 * @body data del usuario
 * Necesita token
 */
router.delete( '/:id', validarJWT, eliminarUsuario );

module.exports = router;