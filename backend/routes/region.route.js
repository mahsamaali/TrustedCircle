const express = require('express');
const app = express();
const regionRoute= express.Router();

//Déclarer de notre models

let Region = require('../models/Region');

// Add Region
regionRoute.route('/create_region').post((req, res, next) => {
    Region.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Voici un Region avec les données : \t', data)
            res.json(data)
        }
    })
});

// Get Tous les regions
regionRoute.route('/get_regions').get((req, res) => {
    Region.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Get single Region
regionRoute.route('/get_region/:id').get((req, res) => {
    Region.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Mettre à jour region
regionRoute.route('/update_region/:id').put((req, res, next) => {
    console.log ('test mise à jour region',req.body);
    Region.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.status(200).json({
                msg: "Region bien modifié",
                data:data
            })
            console.log('Region bien mise à jour')
        }
    })
})

// Supprimmer Region
regionRoute.route('/delete_region/:id').delete((req, res, next) => {
    console.log ('Test supprimé une region',req.params.id);
    Region.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Region bien supprimé",
                data:data
            })
        }
    })
})


module.exports = regionRoute;