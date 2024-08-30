const express = require('express');
const app = express();
const droit_pratiqueRoute= express.Router();

//Déclarer de notre models

let Droit_pratique = require('../models/Droit_pratique');

// Add Droit_pratique
droit_pratiqueRoute.route('/create_droit_pratique').post((req, res, next) => {
    Droit_pratique.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Voici un Droit_pratique avec les données : \t', data)
            res.json(data)
        }
    })
});

// Get Tous les droit_pratiques
droit_pratiqueRoute.route('/get_droit_pratiques').get((req, res) => {
    Droit_pratique.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Get single Droit_pratique
droit_pratiqueRoute.route('/get_droit_pratique/:id').get((req, res) => {
    Droit_pratique.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Mettre à jour droit_pratique
droit_pratiqueRoute.route('/update_droit_pratique/:id').put((req, res, next) => {
    console.log ('test mise à jour droit_pratique',req.body);
    Droit_pratique.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.status(200).json({
                msg: "Droit_pratique bien modifié",
                data:data
            })
            console.log('Droit_pratique bien mise à jour')
        }
    })
})

// Supprimmer Droit_pratique
droit_pratiqueRoute.route('/delete_droit_pratique/:id').delete((req, res, next) => {
    console.log ('Test supprimé un droit_pratique',req.params.id);
    Droit_pratique.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Droit_pratique bien supprimé",
                data:data
            })
        }
    })
})


module.exports = droit_pratiqueRoute;