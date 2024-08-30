export interface Entreprise {
    _id?: string;
    nom_entreprise: string;
    site_web_url: string;
    telephone: string;
    telecopieur: string;
    categorie: string;
    is_AMF: boolean;
    etablissements: [{     
        nom_etablissement: string;
        no_civic: string;
        rue:string;
        ville: string;
        province: string;
        code_postal: string;
    }],




}