const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type : String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type : String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type : String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type : String,
    },
    role: {
        type : String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type : Boolean,
        default: false,
    },
})

// Esto saca los primeros parámetros del retorno JSON en la respuesta del endpoint.
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...object  } = this.toObject();
    object.uid = _id;
    return object;
}

module.exports = model( 'Usuario', UsuarioSchema );