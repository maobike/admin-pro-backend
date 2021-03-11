const { response } = require('express');

const Hospital = require('../models/hospital');

const getHospital = async ( req , res = response ) => {

    // .populate es par traer la llave de la tabla como: de usuario trae el nombre
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img')

    res.json({
        hospitales
    })
}

const crearHospital = async ( req , res = response ) => {

    const uid = req.usuario._id;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error inesperado... revisar logs'
        })
    }

}

const editarHospital = ( req , res = response ) => {

    res.json({
        msg: 'Actualizar Hospital'
    })
}

const eliminarHospital = ( req , res = response ) => {

    res.json({
        msg: 'Eliminar Hospital'
    })
}

module.exports = {
    getHospital,
    crearHospital,
    editarHospital,
    eliminarHospital
}