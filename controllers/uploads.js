const path = require('path');
const fs = require('fs');

const { response, json } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");



const fileUpload = ( req, res = response) => {

    const tipo = req.params.tipo;
    const id   = req.params.id;

    // Permitidos
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];
    const extensionesValidas = ['pbg', 'jpg', 'jpeg', 'gif'];

    // Valido el Id del usuario/hospital/medico


    // Validar tipo
    if ( !tiposValidos.includes(tipo) ) {
        res.status(400),json({
            ok: false,
            msg: 'No es un médico, usuario u hospital (tipo)'
        })
    }

    // Validamos que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo cargado.'
        });
    }

    // Procesar la imagen
    const file = req.files.imagen;
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[ nombreCortado.length - 1 ];

    // Validar extension
    if ( !extensionesValidas.includes( extensionesValidas ) ) {
        res.status(400),json({
            ok: false,
            msg: 'No es una extension permitida'
        })
    }
    
    // Generar nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path de almacenamiento de la imagen
    const pathArchivo = `./uploads/${ tipo }/${ nombreArchivo }`;

    // Mover la imagen
    file.mv(pathArchivo, (error) => {
        if (error){
            console.log(error);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            });
        }

        // Actualizar la base de datos
        actualizarImagen( tipo, id, nombreArchivo );

        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    });

    
}

const retornarImagen = ( req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg =  path.join( __dirname, `../uploads/${ tipo }/${ foto }`);
    
    // Imagen por defecto
    if ( fs.existsSync(pathImg) ) {
        res.sendFile( pathImg );
    }else{
        const pathImg =  path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornarImagen
}