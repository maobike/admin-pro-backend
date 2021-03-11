const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async ( tipo, id, nombreArchivo ) => {

    switch (tipo) {
        case 'hospitales':
            const medico = await Medico.findById( id );
            if ( !medico ) {
                console.log('No es un médico por id');
                return false;
            }

            const pathViejo = `./uploads/medicos/${ medico.img }`;
            // Borrar la imagen anterior
            if ( fs.existsSync( pathViejo ) ) {
                fs.unlink( pathViejo );
            }

            medico.img = nombreArchivo;
            await medico.save();
            return true;
        break;

        case 'medicos':
            
        break;

        case 'usuarios':
            
        break;
    }

}


module.exports = {
    actualizarImagen
}