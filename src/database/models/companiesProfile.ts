import mongoose from 'mongoose';
import { ProfileDataExtendI } from '../../commons/profileDataInterface';

const companiesProfileCollection = 'companiesProfile';

const companiesProfileSchema = new mongoose.Schema({
    nombre: {type: String, required: true},
    nombredefantasia: {type: String, required: false},
    pais: {type: String, required: false},
    tipodeperfil: {type: String, required: false},
    cuit: {type: String, required: false},
    actividadisicprincipal: {type: String, required: false},
    actividadprincipalafip: {type: String, required: false},
    perfildecomercializacion: {type: String, required: false},
    fechadecontratosocial: {type: String, required: false},
    facturacionestimada: {type: String, required: false},
    cantidaddeempleados: {type: String, required: false},
    usuarioresponsable: {type: String, required: false},
    domicilio: {type: String, required: false},
    telefonos: {type: String, required: false},
    sitios: {type: String, required: false},
    redessociales: {type: String, required: false},
    perfilcomprador: [{type: String}],
    perfilcendedor: [{type: String}],
})

export default mongoose.model(companiesProfileCollection, companiesProfileSchema);