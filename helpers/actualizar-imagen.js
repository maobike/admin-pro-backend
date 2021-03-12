const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = ( tipo, imagen ) => {
    const path = `./uploads/${ tipo }/${ imagen }`;
    // Borrar la imagen anterior
    if ( fs.existsSync( path ) ) {
        fs.unlinkSync( path );
    }

}

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById( id );
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            borrarImagen( tipo, medico.img);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'hospitales':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) {
                console.log('No es un hospital por id');
                return false;
            }

            borrarImagen( tipo, hospital.img);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById( id );
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }

            borrarImagen( tipo, usuario.img);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
    }

}


module.exports = {
    actualizarImagen
}