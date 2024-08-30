const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

let Entreprise = new Schema({

    nom_entreprise: {
        type: String,
        required:true
    },

    site_web_url: {
        type: String
    },

    telephone: {
        type: String
    },
    telecopieur: {
        type: String
    },
    categorie: {
        type: String
    },
    is_AMF: {
        type: Boolean,
        required:true
    },
    etablissements: [{
        _id : {auto:false},             // empêche la génération d'un id pour un sous document
        nom_etablissement: { type: String },
        no_civic: { type: String, required:true },
        rue: { type: String, required:true },
        ville: { type: String, required:true },
        province: { type: String, required:true },
        code_postal: { type: String, required:true },
    }],
}, {
    collection: 'entreprises'
})

module.exports = mongoose.model('Entreprise', Entreprise)