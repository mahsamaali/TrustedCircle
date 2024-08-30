const express = require('express');
const app = express();
const utilisateurRoute = express.Router();
let nodeGeocoder = require('node-geocoder');
const multer = require('multer');
const bcrypt = require("bcryptjs");


//Déclarer de notre models

let Utilisateur = require('../models/Utilisateur');




//-------------------------------------------------------
//Upload Image Variables :

const MIME_TYPE = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../frontend/src/assets/uploads');

        // cb(null, './uploads/')
    },

    filename: function (req, file, cb) {
        var nom = file.originalname.split(' ').join('_');
        var point = nom.lastIndexOf('.');
        nom = nom.slice(0, point);
        console.log("nom de image", nom)
        const extension = MIME_TYPE[`${file.mimetype}`];
        console.log("Voici file.mimetype" + MIME_TYPE[file.mimetype])
        cb(null, nom + Date.now() + '.' + extension);

        //cb(null, file.originalname)
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png") {


        cb(null, true);
    } else {
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

//-------------------------------------------------------


// Add Utilisateur
utilisateurRoute.route('/create_utilisateur').post((req, res, next) => {


    bcrypt.hash(req.body.mot_de_passe, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        req.body.mot_de_passe = hash;

        Utilisateur.create(req.body, (error, data) => {
            if (error) {

                // console.log('backend utilisateur route req.body', req.body)
                console.log('Error of Monogo Utilisateur Create', error.code);
                if (error.code = 11000) {
                    res.status(401).json({

                        msg: "Le courriel a été déja enregistré"
                    })
                }


                return next(error);

            } else {
                console.log('Voici un utilisateur bien enregistré : \t', data)
                res.status(201).json({
                    msg: "Utilisateur bien enregistré",
                    isAuth: true,
                    data: data

                })
            }
        })


    });


});


// Authentification Utilisateur
utilisateurRoute.route('/authentification_utilisateur').post((req, res, next) => {
    // console.log("Voici body, on est dans le route auth",req);
    //console.log ("req.body.courriel : ", req.body.courriel, " mot de passe : ", req.body.mot_de_passe);

    Utilisateur.findOne({ 'courriel': req.body.courriel }, (error, data) => {

        if (error) {
            console.log("On est dans la if de authentification_utilisateur avec error", error)

        } else if (data == null) {

            console.log("Le courriel n'existe pas et les infos retournées sont nulles : ", data)
            return res.status(200).json({
                msg: "Courriel et mot de passe invalides",
                isAuth: false
            })

        } else {
            (bcrypt.compare(req.body.mot_de_passe, data.mot_de_passe, function (err, result) {
                if (result === true) {
                    //return callback(null, result);
                    console.log("Le courriel et le mot de passe sont valides");
                    return res.status(200).json({
                        msg: "Ok",
                        isAuth: true,
                        data: data

                    })
                } else {
                    // console.log("On est dans la else de campare au complet")
                    console.log("Le courriel et le mot de passe sont invalides");
                    return res.status(200).json({
                        msg: "Courriel et mot de passe invalides",
                        isAuth: false
                    })
                }
            }))
        }

    })

});


// Get Tous les utilisateurs-Pro en prenant la categorie et region
utilisateurRoute.route('/get_utilisateurs_pro/:droit_pratiques/:regions').get((req, res) => {

    console.log("Backend : req : ", req.params.droit_pratiques, " req.region : ", req.params.regions);

    Utilisateur.find({ 'droit_pratiques': req.params.droit_pratiques, 'regions': req.params.regions }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: "Obtention de tous les utilisateurs réussie",
                data: data
            })
        }
    })



})


// Get Tous les utilisateurs
utilisateurRoute.route('/get_utilisateurs').get((req, res) => {
    Utilisateur.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: "Obtention de tous les utilisateurs réussie",
                data: data
            })
        }
    })
})


// Get single Utilisateur by id
utilisateurRoute.route('/get_utilisateur/:id').get((req, res, next) => {
    Utilisateur.findById(req.params.id, (error, data) => {
        if (error) {

            return next(error)
        } else {
            res.status(200).json({
                msg: "Recherche utilisateur par id réussie",
                data: data
            })
        }
    })
})

// Get single Utilisateur by courriel
utilisateurRoute.route('/get_utilisateur_courriel/:courriel').get((req, res, next) => {
    // console.log ('test index courriel',req.params.courriel);
    Utilisateur.findOne({ courriel: req.params.courriel }, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: "Recherche utilisateur par courriel réussie",
                data: data
            })
        }
    })
})


// Mettre à jour utilisateur
utilisateurRoute.route('/update_utilisateur/:id').put((req, res, next) => {

    // console.log("Test trim", req.body.no_civic.trim())
    req.body.no_civic = req.body.no_civic.trim();
    req.body.rue = req.body.rue.trim()

    req.body.latitude = 0;
    req.body.longitude = 0;

    if (req.body.no_civic != "" && req.body.rue != "") {
        var adresse = { 'no_civic': req.body.no_civic, 'rue': req.body.rue }
        //console.log("Test Geo")
        gelocalisateur(adresse).then((data) => {
            if (data.latitude == null || data.longitude == null) {
                req.body.latitude = 0;
                req.body.longitude = 0;
            } else {
                req.body.latitude = data.latitude;
                req.body.longitude = data.longitude;
            }

        }).then(() => {

            Utilisateur.findByIdAndUpdate(req.params.id,

                {
                    $set: req.body
                }, {
                new: true
            },
                (error, data) => {
                    if (error) {
                        return next(error);

                    } else {
                        //console.log("Adresse############",req.body.adresses[0])




                        res.status(200).json({
                            msg: "Utilisateur bien modifié",
                            data: data
                        })
                        console.log('Utilisateur bien mise à jour')
                    }
                    //  })

                });

        });
    } else {

        Utilisateur.findByIdAndUpdate(req.params.id,

            {
                $set: req.body
            }, {
            new: true
        },
            (error, data) => {
                if (error) {
                    return next(error);

                } else {


                    res.status(200).json({
                        msg: "Utilisateur bien modifié",
                        data: data
                    })
                    console.log('Utilisateur bien mise à jour')
                }
                //  })

            });




    }









})




//upload Image 
utilisateurRoute.route('/upload_image/:id').post(upload.single('photo_utilisateur'), async (req, res, next) => {


    console.log("Voici id", req.params.id);
    console.log("Voici file ", req.file);

    //    let nom=req.file.filename+date;
    //    console.log("Voici la nom de l'image+date",nom)


    var photo_utilisateurJson = { 'photo_utilisateur': req.file.filename }
    //console.log("$$$$$$$$req\t\t",req)
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    Utilisateur.findByIdAndUpdate(req.params.id, {

        $set: photo_utilisateurJson
    }, {
        new: true
    },
        (error, data) => {
            if (error) {
                console.log("Affiche-moi l'erreur", error)
                return next(error);

            } else {
                res.status(200).json({
                    msg: "L'image de l'utilisateur bien modifié",
                    data: data
                })
                console.log("L'image de l'utilisateur bien mise à jour")
            }
        })

    //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
})



//------------------------------------------------------------------
// Mettre à jour push ajout de sous document Array utilisateur
utilisateurRoute.route('/update_push_utilisateur/:id').put((req, res, next) => {
    console.log('test mise à jour', req.body);
    Utilisateur.findByIdAndUpdate(req.params.id, {

        $push: req.body
    }, {
        new: true
    },
        (error, data) => {
            if (error) {
                return next(error);
                console.log(error)
            } else {
                res.status(200).json({
                    msg: "Utilisateur bien modifié",
                    data: data
                })
                console.log('Utilisateur bien mise à jour')
            }
        })
})



// Supprimmer Utilisateur
utilisateurRoute.route('/delete_utilisateur/:id').delete((req, res, next) => {
    console.log('Test supprimé un utilisateur', req.params.id);
    Utilisateur.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Utilisateur bien supprimé",
                data: data
            })
        }
    })
})





//Function geolocalisateur

function gelocalisateur(adresse) {
    let options = {
        provider: 'openstreetmap'
    };

    let geoCoder = nodeGeocoder(options);

    let adresseRechercher = `${adresse.no_civic}, ${adresse.rue}`;




    console.log("************Adresse***********", adresseRechercher)
    var temp = geoCoder.geocode(adresseRechercher)
        .then((res) => {

            console.log("Voici l'adresse de Geolocalisateur : \t", res);
            return {
                'latitude': res[0].latitude,
                'longitude': res[0].longitude
            }
        })
        .catch((err) => {
            return err
            console.log(err);
        });
    //console.log("Temp async",await temp);
    return temp
}











//Function Error Handerler
function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }
    res.status(500);
    console.log("Erreur !!!!!!!!!!! /t ", err)
    res.render('error', { error: err })
}

module.exports = utilisateurRoute;