const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const Usuario = require('../models/usuario');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;

    // const usuarios = await Usuario.find()
    //     .skip( desde )
    //     .limit( 5 );

    // const total = await Usuario.count();

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(),
        Usuario
            .find({}, 'nombre email role google')
            .skip( desde )
            .limit( 5 )
    ]);

    res.json({
        ok: true,
        desde,
        total,
        usuarios,
    })

}

const crearUsuario = async (req, res = response) => {

    const { nombre, password, email } =  req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if ( existeEmail ) {
            return res.status(400).json({
                msg: 'El correo ya está registrado'
            });
        }

        const usuario = new Usuario( req.body );

        // Encriptar contraseña 
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario
        await usuario.save();

        // Generar el JWT
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const editarUsuario = async (req, res = response) => {

    const uid = req.params.id;
    const { password, google, email, ...campos } = req.body;

    try {
        const usuarioDB = await Usuario.findById( uid );
        if ( !usuarioDB ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese Id'
            });
        }

        // Actualizaciones
        if ( usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    msg: `Ya existe un usuario con el email: ${ email }`
                })
            }
        }

        campos.email = email;
        // new: true -> para que regrese mongo la data actualizada para visualizar
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true} );


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado... revisar logs'
        })
    }
    
}

const eliminarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    const usuarioDB = await Usuario.findById( uid );
    if ( !usuarioDB ) {
        return res.status(404).json({
            msg: 'No existe un usuario con ese Id'
        });
    }

    // Físicamente lo borramos
    //await Usuario.findByIdAndDelete( uid);

    const usuario = await Usuario.findByIdAndUpdate( uid, { estado: false } );

    try {
        res.json({
            ok: true,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado... revisar logs'
        })
    }
}    

module.exports = {
    getUsuarios,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
}