const { response } = require('express');

const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getMedico = async ( req , res = response ) => {
    const medicos = await Medico.find()
        .populate('usuario', 'nombre img')
        .populate('hospital', 'nombre img')

    res.json({
        medicos
    })
}

const crearMedico = async ( req , res = response ) => {

    const uid = req.usuario._id;
    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {
        // Validar que el hospital exista
        const hospitalDB = await Hospital.findById( req.body.hospital );
        
        if ( !hospitalDB ) {
            return res.status(400).json({
                ok: false,
                msg: `El hospital con uid ${ req.body.hospital } no existe`
            })
        }

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const editarMedico = ( req , res = response ) => {

    res.json({
        msg: 'Actualizar Medico'
    })
}

const eliminarMedico = ( req , res = response ) => {

    res.json({
        msg: 'Eliminar Medico'
    })
}

module.exports = {
    getMedico,
    crearMedico,
    editarMedico,
    eliminarMedico
}