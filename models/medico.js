const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
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
    },
    hospital: {
        required: true,
        type : Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

// Esto saca los primeros parámetros del retorno JSON en la respuesta del endpoint.
MedicoSchema.methods.toJSON = function() {
    const { __v, ...object  } = this.toObject();
    return object;
}

module.exports = model( 'Medico', MedicoSchema );