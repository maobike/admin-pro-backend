const { response } = require('express');

const Usuario  = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico   = require('../models/medico');

const getTodo = async ( req , res = response ) => {

    const search = req.params.search;
    const regex  = new RegExp( search, 'i' );

    // Manejar la búsqueda de manera simultanea todas las peticiones.
    const [usuarios, hospitales, medicos] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medico.find({ nombre: regex })
    ])

    res.json({
        ok: true,
        usuarios,
        hospitales,
        medicos
    })
}

const getCollectionTable = async ( req , res = response ) => {

    const table  = req.params.table;
    const search = req.params.search;
    const regex  = new RegExp( search, 'i' );
    let data = [];

    switch (table) {
        case 'medicos':
            data = await Medico.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('hospital', 'nombre img')
        break;

        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
            .populate('usuario', 'nombre img')
        break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
        break;
    
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla debe ser usuarios/medicos/hospitales'
            })
    }

    res.json({
        ok: true,
        resultados: data
    })

}


module.exports = {
    getTodo,
    getCollectionTable
}