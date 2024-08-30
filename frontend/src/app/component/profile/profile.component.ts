import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/compiler/src/util';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { AvisService } from 'src/app/services/avis.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  // boolean icon social



  isFacebook: Boolean = false;
  isLinkedin: Boolean = false;


  // Info de l'utilisateur 

  categorieGlobal: String;



  titre_profession: String;

  telephone: String;
  courriel: String;

  nom: String;
  prenom: String;
  nomComplet: String

  // AMF Section
  no_de_certificat: String;
  no_BDNI: String;
  numero_AMF: String;
  status: String;
  honoraires: String;
  biographie_description: String;
  site_web_url: String;
  url_Linkedin: String;
  url_Facebook: String;
  cote: Number;
  nbre_total_cote: String;
  droit_pratiques: string;
  region: string;
  // Adresse User pro
  no_civic: String;
  rue: String;
  ville: String;
  province: String;
  code_postal: String;
  adresseComplet: string;

  latitude: number;
  longitude: number;

  urlDeImage: String;



  // Tableau

  tableauAdressComplet: any = [];
  tabUserbProProfile: any = [];
  tabCategorieGlobal: any = [];
  tabUserAvis: any = [];

  tabRegions: any = [];
  tabDroitDePratique: any = [];
  tabEntreprise: any = [];
  id: String;







  // Google Map Section***///////////////----------

  markerOptions: google.maps.MarkerOptions;
  markerPositions: google.maps.LatLngLiteral[];
  center: google.maps.LatLngLiteral;
  zoom: number;
  lat: number;
  lng: number;
  afficherMap: boolean = false;

  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;



  addMarker(center: google.maps.LatLngLiteral) {
    this.markerPositions.push(this.center);
    console.log('this.markerPositions: ', this.markerPositions)
  }

  openInfoWindow(marker: MapMarker) {
    this.infoWindow.open(marker);
  }

  // Google Map Section***///////////////----------


  constructor(private UserService: UserService,
              private userAvis: AvisService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.prenom = this.actRoute.snapshot.paramMap.get('prenom');
    console.log('Je suis dans le profile de ', this.prenom, ' avec le id', this.id)
    this.getUser(this.id)

    this.userAvis.getAvis(this.id).subscribe(data =>{

      this.tabUserAvis = data;
      console.log("Data : ", this.tabUserAvis);

    });


  }
  getUser(id) {
    this.UserService.getUtilisateurByID(id).subscribe(data => {
      this.tabUserbProProfile = data['data'];
      console.log('tabUserbProProfile profile:', this.tabUserbProProfile)
      // console.log('regions', this.tabUserbProProfile.regions[0])
      // console.log('Adresse:', this.tabUserbProProfile.adresses.code_postal, this.tabUserbProProfile.adresses[0].no_civic)
      // console.log('Droit de pratique', this.tabUserbProProfile.droit_pratiques[0])
      console.log('categorie global', this.tabUserbProProfile.categorie_global)


      // console.log('this.tabEntreprise: ', this.tabEntreprise, 'entreprise ', this.tabUserbProProfile.user_pro.entreprises)

      this.telephone = this.tabUserbProProfile.telephone;
      this.nom = this.tabUserbProProfile.nom;
      this.prenom = this.tabUserbProProfile.prenom
      this.courriel = this.tabUserbProProfile.courriel;

      // User_pro Section AMF
      this.no_de_certificat = this.tabUserbProProfile.no_certificat
      this.no_BDNI = this.tabUserbProProfile.no_BDNI;
      this.numero_AMF = this.tabUserbProProfile.numero_AMF;
      this.honoraires = this.tabUserbProProfile.honoraires;
      this.biographie_description = this.tabUserbProProfile.biographie_description;
      this.site_web_url = this.tabUserbProProfile.site_web_url;
      this.cote = this.tabUserbProProfile.cote;
      this.titre_profession = this.tabUserbProProfile.titre_profession;
      this.nbre_total_cote = this.tabUserbProProfile.nbre_total_cote;
      this.region = this.tabUserbProProfile.regions
      this.droit_pratiques = this.tabUserbProProfile.droit_pratiques;
      this.tabEntreprise = this.tabUserbProProfile.entreprises;
      this.categorieGlobal = this.tabUserbProProfile.categorie_global
      this.status = this.tabUserbProProfile.status
      
      this.urlDeImage = `../../../assets/uploads/${this.tabUserbProProfile.photo_utilisateur}`;
      
      console.log('urlDeImage - photo_utilisateur: ', this.urlDeImage)
            

      this.url_Linkedin = this.tabUserbProProfile.url_Linkedin;
      console.log('this.url_Linkedin: ',this.url_Linkedin)

      if (this.url_Linkedin != "")
      {
        this.isLinkedin = true;
        }
      this.url_Facebook = this.tabUserbProProfile.url_Facebook;
      if (this.url_Facebook != "")
      {
        this.isFacebook = true;
        }

      // Set reviews section
      this.setReviews(this.cote);

      this.latitude = this.tabUserbProProfile.latitude;
      this.longitude = this.tabUserbProProfile.longitude;

      // Adresse section
      this.no_civic = this.tabUserbProProfile.no_civic;
      this.rue = this.tabUserbProProfile.rue;
      this.ville = this.tabUserbProProfile.ville;
      this.province = this.tabUserbProProfile.province;
      this.code_postal = this.tabUserbProProfile.code_postal;
      // console.log('this.no_civic', this.no_civic)
      // console.log('Je rentre dans la boucle longueur', this.tabUserbProProfile.adresses.length)

      // let longueur = this.tabUserbProProfile.adresses.length

      // for (let index = 0; index < longueur; index++) {
      //   const element = this.tabUserbProProfile.adresses[index];

      //   let no_civic = element.no_civic;
      //   let rue = element.rue;
      //   let ville = element.ville;
      //   let province = element.province;
      //   let code_postal = element.code_postal;
      //   // 1355, boul des Laurentides, Vimont QC H7M 2Y2
      this.adresseComplet = this.no_civic + ", " + this.rue + " " + this.ville + " " + this.province + " " + this.code_postal;
      //   console.log('Adresse complet ',adresseComplet)
      //   this.tableauAdressComplet[index] = adresseComplet;

      //   console.log('no_civic',no_civic)
      //   console.log('Element', element)

      // }



      //     no_civic: String;
      // rue: String;
      // ville: String;
      // province: String;
      // code_postal: String;






      


      this.nomComplet = this.prenom + " " + this.nom

      if (this.latitude == 0 || this.longitude == 0) {
        this.afficherMap = false;

      } else {
        this.afficherMap = true;
        this.obtenirInfoMap(this.latitude, this.longitude)
      }




    });
  }

  obtenirInfoMap(latitude, longitude) {
  
      // Google Map Section***///////////////----------

      this.lat = latitude;
      this.lng = longitude;

      this.center = { lat: this.lat, lng: this.lng };
      this.zoom = 15;

      this.markerOptions = {
        label: {
          color: 'green',
          text: 'Je suis ici'
        }
      };

      this.markerPositions = [];
      this.addMarker(this.center)

      // Google Map Section***///////////////----------



}



  // Function pour afficher le rating(Cote)
  setReviews(cote: Number) {

    // let theNumber = (<HTMLInputElement>document.querySelector('#numInput')).value;
    let new_cote = stringify(cote);
    let numReview = parseFloat(new_cote);
    console.log('Numreview: ', numReview, "New cote", new_cote)
    let color: string;
    // if (isNaN(numReview)) {
    //   alert('Veuillez donner un avis');
    //   theNumber = '0';
    // }
    let beforeDecimal: number = Math.floor(numReview);
    let afterDecimal: number = numReview - beforeDecimal;
    const circle = document.getElementsByClassName('half-review') as HTMLCollectionOf<HTMLElement>;
    if (afterDecimal <= 0.2) {
      afterDecimal = Math.floor(afterDecimal);
    }
    else if (afterDecimal >= 0.29 && afterDecimal <= 0.71) {
      afterDecimal = 0.5;
    }
    else {
      afterDecimal = Math.round(afterDecimal);
    }

    numReview = beforeDecimal + afterDecimal;

    if (numReview >= 1 && numReview < 2) {
      color = '#F92525';
    }
    else if (numReview >= 2 && numReview < 3) {
      color = '#F37F2F';
    }
    else if (numReview >= 3 && numReview < 4) {
      color = '#ffff00';
    }
    else if (numReview >= 4 && numReview < 5) {
      color = '#98FF6B'
    }
    else {
      color = '#25CCF9';
    }


    for (let i = 0; i < 10; i++) {
      circle[i].style.backgroundColor = 'lightgray';
    }

    for (let i = 0; i < numReview * 2; i++) {
      circle[i].style.backgroundColor = color;

    }

    // document.querySelector('#score').innerHTML = theNumber;
  }

}
