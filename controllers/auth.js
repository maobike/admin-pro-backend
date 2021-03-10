const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs =  require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        // Verificar si existe email
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos : Email no coincide'
            })
        }

        // Verificar la clave
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'El Usuario / Password no son correctos : Password malo'
            })
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

}
module.exports = {
    login
}