const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const equipementSchema = new Schema({
    num_serie: {
        type: String,
    },
    marque: {
        type: String,
    },
    code_agence:{
        type: Number
    },
    date_visite_pre: {
        type: Date,
    },
    date_mise_service: {
        type: Date,
    },
    date_installation_physique: {
        type: Date,
    },
    date_transfert: {
        type: Date,
    },
    modele_pc: {
        type: String,
        required: true
    },
    modele: {
        type: String,
    },
    code_barre:{
        type:Number
    },
    os: {
        type: String,
    },
    nb_camera :{
        type:Number
    },
    type_ecran:{
        type: String,
    },
    nb_casette:{
        type:Number
    },
    version_application:{
        type:String
    }

}, { timestamps: true });

module.exports = mongoose.model('Equipement', equipementSchema);
