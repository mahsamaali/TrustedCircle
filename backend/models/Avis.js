const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

let Avis = new Schema({

    imageAvis: {type: String},

    destination_id_FK: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Utilisateur"
    },
    titre: {
        required: true,
        type: String
    },
    cote_evaluation: {
        required: true,
        type: Number,
        default:0
    },
    type: {
        required: true,
        type: String
    },


    origine_id_FK: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: "Utilisateur"
    },
    texte: { type: String, required: true },
    nb_abus: { type: Number ,default:0 },
    nb_balise_aime: { type: Number , default:0 },
    nbre_partage: { type: Number  , default:0},
    date_hre_creation: { type: Date, default: Date.now },

}, {
    collection: 'avis'
})

module.exports = mongoose.model('Avis', Avis)