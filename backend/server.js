let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
dbConfig = require('./database/db');
var MongoClient = require('mongodb').MongoClient;
var utilisateurData=require('../backend/data/data_utilisateurs_pro.json');
// Configuration des middlewares 
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));

//Déclarations des routes 
const utilisateur = require('./routes/utilisateur.route');
const entreprise = require('./routes/entreprise.route');
const avis = require('./routes/avis.route');
const region = require('./routes/region.route');
const droit_pratique = require('./routes/droit_pratique.route');


//Appeller les middleware de nos fichiers ou se trouvent dans le dossier routes
app.use('/api', utilisateur);
app.use('/api', entreprise);
app.use('/api', avis);
app.use('/api', region);
app.use('/api', droit_pratique);




// Connecting with mongo db
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {useNewUrlParser: true , useUnifiedTopology: true }
).then(() => {
        console.log('Database sucessfully connected')
      
    },
    error => {
        console.log('Database could not connected: ' + error)
    }
)

var url = "mongodb://localhost:27017/";  //URL pour se connecter à  Mongodb
MongoClient.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
    var dbo=db.db("trustedCircleBD");

    //     //Ajouter des patient si dans la collection est a zero
    dbo.collection("utilisateurs").countDocuments().then((count, error) => {
        if (error) {
            console.log(error)
        }
        if (count == 0) {
            console.log(count);

            dbo.collection("utilisateurs").insertMany(utilisateurData, (err, res) => {
                if (err) throw err;
                console.log("Le Nombre des utilisateurs Pro est: " + res.insertedCount);
                db.close();
            });
        }
    });


    
})


//------------------------------------------------
// MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
//     if (err) throw err;
//     var dbo = db.db("hopitalgestion");

//     console.log('a');




//------------------------------------------------

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

