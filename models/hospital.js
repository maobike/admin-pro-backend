const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    img: {
        type : String,
    },
    usuario: {
        required: true,
        type : Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'hospitales' });

// Esto saca los primeros parámetros del retorno JSON en la respuesta del endpoint.
HospitalSchema.methods.toJSON = function() {
    const { __v, ...object  } = this.toObject();
    return object;
}

module.exports = model( 'Hospital', HospitalSchema );