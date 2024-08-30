import { Observable } from 'rxjs';

export interface Utilisateur {

    _id: string;
    nom: string;
    prenom: string;
    courriel: string;
    mot_de_passe: string;
    telephone: string;
    photo_utilisateur: string;
    date_hre_connexion: Date;
    date_hre_deconnexion: Date;
    role: string;
    nb_avis: number;
    nb_aime: number;

    no_civic: string;
    rue: string;
    ville: string;
    province: string;
    code_postal: string;
    nom_entreprise: string;
    site_web_url: string;
    latitude: number;
    longitude: number;


    categorie_global: string;
    titre_profession: string;
    no_certificat: string;
    no_BDNI: string;
    numero_AMF: string;
    status: string;
    honoraires: string;
    biographie_description: string;

    url_Linkedin: string;
    url_Facebook: string;
    cote: number;
    nbre_total_cote: number;
    regions: {
        type: string,
    },
    droit_pratiques: {
        type: string,
    }




}

export abstract class UserData {

    abstract getCurrentUser(): Observable<Utilisateur>;

}