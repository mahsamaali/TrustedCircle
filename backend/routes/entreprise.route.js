const express = require('express');
const app = express();
const entrepriseRoute= express.Router();

//Déclarer de notre models

let Entreprise = require('../models/Entreprise');

// Add Entreprise
entrepriseRoute.route('/create_entreprise').post((req, res, next) => {
    Entreprise.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Voici un Entreprise avec les données : \t', data)
            res.json(data)
        }
    })
});

// Get Tous les entreprises
entrepriseRoute.route('/get_entreprises').get((req, res) => {
    Entreprise.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Get single Entreprise
entrepriseRoute.route('/get_entreprise/:id').get((req, res) => {
    Entreprise.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Mettre à jour entreprise
entrepriseRoute.route('/update_entreprise/:id').put((req, res, next) => {
    console.log ('test mise à jour entreprise',req.body);
    Entreprise.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.status(200).json({
                msg: "Entreprise bien modifié",
                data:data
            })
            console.log('Entreprise bien mise à jour')
        }
    })
})

// Supprimmer Entreprise
entrepriseRoute.route('/delete_entreprise/:id').delete((req, res, next) => {
    console.log ('Test supprimé une entreprise',req.params.id);
    Entreprise.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Entreprise bien supprimé",
                data:data
            })
        }
    })
})


module.exports = entrepriseRoute;