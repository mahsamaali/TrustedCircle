export interface Avis {
    

    _id?: string;
    destination_id_FK: string;
    cote_evaluation: number;
    titre:string;
    type: string;
    image: string;

    
    origine_id_FK: string;
    texte: string;
    nb_abus: number;
    nb_balise_aime: number;
    nbre_partage: number
    date_hre_creation: Date;



   


}
