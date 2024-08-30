const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

let Droit_pratique = new Schema({

    nom_droit_pratique: {type: String, required:true
    }
}, {
    collection: 'droit_pratiques'
})

module.exports = mongoose.model('Droit_pratique', Droit_pratique)