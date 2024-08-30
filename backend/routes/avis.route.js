const express = require('express');
const app = express();
const avisRoute= express.Router();

//Déclarer de notre models

let Avis = require('../models/Avis');
let Utilisateur = require('../models/Utilisateur');

// Add Avis
avisRoute.route('/create_avis').post(async (req, res, next) => {
    if ((req.body.type == "A") & (req.body.destination_id_FK != req.body.origine_id_FK)) {

    //    const infoCote =  await calculerCote(req.body.destination_id_FK);
    infoCote = await calculerCote(req.body)
    //    console.log ("infoCote", infoCote);
       enregistrerCoteUserPro(infoCote);
    //    .then((infoCote)=> {
    }
    Avis.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            console.log('Voici un Avis avec les données : \t', data)
            res.json(data)
        }
    })
});



// Get Tous les avis
avisRoute.route('/get_avis').get((req, res, next) => {
    Avis.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Get single Avis
avisRoute.route('/get_avis/:id').get((req, res, next) => {
    Avis.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})



// Get Tous les avis d'un utilisateur
avisRoute.route('/get_avis_utilisateur/:destination_id_FK').get((req, res, next) => {
    Avis.find({'destination_id_FK' : req.params.destination_id_FK}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    }).sort({date_hre_creation: -1})
})


// Mettre à jour avis
avisRoute.route('/update_avis/:id').put((req, res, next) => {
    console.log('test mise à jour avis', req.body);
    Avis.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {
        new: true
    },
        (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.status(200).json({
                    msg: "Avis bien modifié",
                    data: data
                })
                console.log('Avis bien mise à jour')
            }
        })
})


// Mettre à jour push ajout de sous document Array commentaire
avisRoute.route('/update_push_avis/:id').put((req, res, next) => {
    console.log ('test mise à jour',req.body);
    Avis.findByIdAndUpdate(req.params.id, {
       
        $push: req.body
    },{
        new: true
    }, 
    (error, data) => {
        if (error) {
            return next(error);
            console.log(error)
        } else {
            res.status(200).json({
                msg: "Avis bien modifié",
                data:data
            })
            console.log('Avis bien mise à jour')
        }
    })
})




// Supprimmer Avis
avisRoute.route('/delete_avis/:id').delete((req, res, next) => {
    console.log ('Test supprimé une avis',req.params.id);
    Avis.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: "Avis bien supprimé",
                data:data
            })
        }
    })
})


module.exports = avisRoute;



// 
// function calculerCote(avisRecu: any): Promise<{
//     userProid: any;
//     cote: number;
//     nbre_total_cote: any;
// }>
// 
//   à l'enregistrement d'un nouvelle avis calcule 
//   la nouvelle cote de l'utilisateur Pro
// 
//              Validation 
//   1e) Qu'il s'agit d'un Avis
//   2e) Que ce n'est pas l'utilisateur pro lui-même
//   qui enregistre un avis
//   
// 

async function calculerCote(avisRecu) {

const infoCote =  await obtenirCoteUserPro(avisRecu.destination_id_FK)

// console.log ("CalculerCote No_2 :",  infoCote);
//     console.log ("CalculerCote No_2 :",  data);
console.log ("valeur reçues : " , infoCote);
var cote = infoCote.cote * infoCote.nbre_total_cote++;    // Cote actuelle * nbre total de cote
                                                                 // ensuite incrémente nbre total de cote de +1
console.log ("valeur reçues en transit : " , infoCote, " & cote total 1 : ", cote);
cote += avisRecu.cote_evaluation;
console.log ("valeur reçues en transit : " , infoCote, " & cote total 2 : ", cote);
cote  = ((cote/infoCote.nbre_total_cote)*100)/100;
console.log ("valeur reçues en transit : " , infoCote, " & cote total 3 : ", cote);

return {
    'userProid' : avisRecu.destination_id_FK,
    'cote': cote.toFixed(2),
    'nbre_total_cote': infoCote.nbre_total_cote
};
}

// 
// function obtenirCoteUserPro(userProid: any): Promise<{
//     cote: any;
//     nbre_total_cote: any;
// }>
// 


async function obtenirCoteUserPro(userProid) {
    // console.log ("obtenirCoteUserPro No_1 :",userProid);
    var infoCote = await Utilisateur.findById(userProid, (error, data) => {
        if (error) {
            // console.log ("obtenirCoteUserPro No_Error :",error);
            return error
        } else {
            // console.log ("obtenirCoteUserPro No_3 data.user_pro.cote :", data.user_pro.cote);
            // console.log ("obtenirCoteUserPro No_4 nbre_total_cote :", data.user_pro.nbre_total_cote);
        }

    }).then((data) => {
        return {
            'cote': data.cote,
            'nbre_total_cote': data.nbre_total_cote
        };
    })

return infoCote
}


// 
// function enregistrerCoteUserPro(infoCote: any): Promise<void>
// 


async function enregistrerCoteUserPro(infoCote) {

await Utilisateur.findByIdAndUpdate(infoCote.userProid, {
       
    $set: {
        "cote": infoCote.cote,
        "nbre_total_cote": infoCote.nbre_total_cote
    }
},{
    new: true
}, 
(error, data) => {
    if (error) {
        console.log(error)
        return error;
       
    } else {
        console.log('Utilisateur bien mise à jour')
        return {
            msg: "Utilisateur bien modifié",
            data:data
        }
    }
})

}

