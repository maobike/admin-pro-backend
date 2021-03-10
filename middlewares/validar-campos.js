const { validationResult } = require("express-validator");
const { response } = require('express');

const validarCampos = ( req, res = response, next ) => { // next es la llamada al final si pasa tdo bien

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errores: errors.mapped()
        });
    }

    next();
}


module.exports = {
    validarCampos
}
