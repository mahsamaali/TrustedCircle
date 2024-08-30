const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


let Utilisateur = new Schema({

    nom: {
        type: String,
        required: true
    },

    prenom: {
        type: String,
        required: true
    },

    courriel: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        // 
        //  mieux vaut définir l'index directement via le SGBD
        // option non performante en production car il y a autocréation 
        // à chaque démarrage de l'application
        // 
         unique: true
        // 
    },
    mot_de_passe: {
        type: String,
        required: true
    },
    telephone: {
        type: String, default: ""
    },
    photo_utilisateur: {
        type: String, default: "avatar.png"
    },
    date_creation: {
        type: Date, default: Date.now
    },
    date_hre_connexion: {
        type: Date
    },
    date_hre_deconnexion: {
        type: Date,

    },
    role: {
        type: String,
        required: true
    },
    nb_avis: {
        type: Number, default: 0
    },
    nb_aime: {
        type: Number, default: 0
    },

    no_civic: { type: String, default: "" },
    rue: { type: String, default: "" },
    ville: { type: String, default: "" },
    province: { type: String, default: "" },
    code_postal: { type: String, default: "" },
    nom_entreprise: { type: String, default: "" },
    site_web_url: { type: String, default: "" },
    latitude: { type: Number, default: 0 },
    longitude: { type: Number, default: 0 },

    categorie_global: { type: String, default: "" },
    titre_profession: { type: String, default: "" },
    no_certificat: { type: String, default: "" },
    no_BDNI: { type: String, default: "" },
    numero_AMF: { type: String, default: "" },
    status: { type: String, default: "" },
    honoraires: { type: String, default: "" },
    biographie_description: { type: String, default: "" },

    url_Linkedin: { type: String, default: "" },
    url_Facebook: { type: String, default: "" },

    cote: { type: Number ,default:0 },
    nbre_total_cote: { type: Number , default:0},

    regions: {
        type: String, default: ""
    },
    droit_pratiques: {
        type: String, default: ""
    }


}, {
    collection: 'utilisateurs'
})

module.exports = mongoose.model('Utilisateur', Utilisateur)