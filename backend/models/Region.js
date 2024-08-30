const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

let Region = new Schema({

    nom_region: {type: String, required:true
    }
}, {
    collection: 'regions'
})

module.exports = mongoose.model('Region', Region)