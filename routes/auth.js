/**
 * Ruta: /api/login
 */
const { Router } = require('express');
const { login } = require('../controllers/auth')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post( '/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').notEmpty(),
        check('password', 'El password debe tener más de 6 caracteres').isLength({ min: 6 }),
        validarCampos
    ],
    login
);

 module.exports = router;