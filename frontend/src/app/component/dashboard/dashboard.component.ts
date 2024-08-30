import { HttpEventType } from '@angular/common/http';
import { Component, NgZone, OnInit, Input,ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from 'src/app/models/utilisateur';
import { UserService } from '../../services/user.service';
import {NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbAlertConfig]
})

export class DashboardComponent implements OnInit {

  @Input() public alerts: Array<string> = [];
  isUser: Boolean = true;
  message: Boolean = false;
  isAdresseValide: boolean = true;
  submitted = false;
  updateForm: FormGroup;

  userPro: Utilisateur;

  tabUserProRegions: any = [
    'Bas-Saint-Laurent',
    'Saguenay–Lac-Saint-Jean',
    'Capitale-Nationale',
    'Mauricie',
    'Estrie',
    'Montréal',
    'Outaouais',
    'Abitibi-Témiscamingue',
    'Côte-Nord',
    'Nord-du-Québec',
    'Gaspésie–Îles-de-la-Madeleine',
    'Chaudière-Appalaches',
    'Laval',
    'Lanaudière',
    'Laurentides',
    'Montérégie',
    'Centre-du-Québec'
  ]

 tabUserProCategories: any = [
    'Assurance',
    'Immobilier',
    'Fiscalité',
    'Droit',
    'Investissement'    
  ]


  tabUserProvince: any = [
   ' Alberta',
    'Colombie-Britannique',
    'Île-du-Prince-Édouard',
    'Manitoba',
    'Nouveau-Brunswick',
    'Nouvelle-Écosse',
    'Nunavut',
    'Ontario',
    'Québec',
    'Saskatchewan',
    'Terre-Neuve-et-Labrador',
    'Territoires du Nord-Ouest',
    'Yukon'
  ]







  selectedFile: File = null; //Pour Upload photo_utilisateur

  public message_Photo: string;  //Pour afficher le message d'erreur photo_utilisateur

  public imagePath;    //Upload Image
  imgURL: any;        //Upload Image


  // public urlDeImage :any;

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
  droit_pratiques: String;
  numero_AMF: String;
  status: String;
  honoraires: String;
  biographie_description: String;
  site_web_url: String;
  url_Linkedin: String;
  url_Facebook: String;
  cote: number = 0;
  nbre_total_cote: number;

  mess = 'allo';

  

  // Adresse User pro
  no_civic: String;
  rue: String;
  ville: String;
  province: String;
  code_postal: String;

  regions: String;


  // Tableau

  tableauAdressComplet: any = [];
  tabUserbProProfile: any = [];
  tabCategorieGlobal: any = [];

  tabRegions: any = [];
  tabDroitDePratique: any = [];
  tabEntreprise: any = [];
  id: String;




  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private actRoute: ActivatedRoute,
    alertConfig: NgbAlertConfig


  ) {
    alertConfig.type = 'success';
    alertConfig.dismissible = false;
    this.mainForm();
  }


  ngOnInit() {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }


    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.userService.getUtilisateurByID(this.id).subscribe(data => {
      this.getUser(this.id)
    // console.log(data.staus)
      
    })
    
  }

  mainForm() {

    console.log('mainForm ')

    this.updateForm = this.fb.group({

      prenom: ['', [Validators.required,Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,30}$')]],
      nom: ['', [Validators.required,Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,30}$')]],
      // courriel: ['',],
      courriel: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      // mot_de_passe: ['', [Validators.required]],
      telephone: ['',[Validators.pattern('^[0-9]{3}[ -]?[0-9]{3}[ -]?[0-9]{4}$')]],
      no_civic: ['',[Validators.pattern('^[0-9]{1,5}[A-Za-z]?$')]],
    
      // ville: ['',[Validators.pattern('^[A-Za-z][A-Za-z \'-\x00C\0-\x00FF]{2,30}$')]],
  
       rue: ['',[Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,50}$')]],
       ville: ['',[Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,50}$')]],
       province: [''],
       code_postal: ['',[Validators.pattern('^[A-Za-z][0-9][A-Za-z][ -]?[0-9][A-Za-z][0-9]$')]],
      //  nom_entreprise: ['', [Validators.required]],




        categorie_global: ['',[Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z\u00C0-\u00FF]{0,30}$')]],
        titre_profession: ['',[Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z\u00C0-\u00FF]{0,30}$')]],
        no_certificat: ['',[Validators.pattern('[0-9]{6}')]],
        no_BDNI: ['',[Validators.pattern('[0-9]{7}')]],
       numero_AMF: ['',[Validators.pattern('[0-9]{10}')]],
      // status : ['', [Validators.required]],
       honoraires: ['',[Validators.pattern('^[ \'\\-A-Za-z!-9\u00C0-\u00FF]{0,30}$')]],
       biographie_description: ['',[Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;?@\u00C0-\u00FF]{0,300}$')]],
        site_web_url: ['',[Validators.maxLength(200)]],
        url_Linkedin: ['',[Validators.maxLength(100)]],
      url_Facebook: ['',[Validators.maxLength(100)]],
     


      //  adresses: ['', [Validators.required]],
        regions: [''],
        droit_pratiques: ['']


      //   phoneNumber: ['', [Validators.pattern('^[0-9]+$')]]
    })
  }

onAdresse() {
 this.isAdresseValide = true;
//  alert(this.updateForm.value.no_civic)
 if(this.updateForm.value.no_civic == "" && this.updateForm.value.rue == "" 
 && this.updateForm.value.ville == "" && this.updateForm.value.province == "" 
 && this.updateForm.value.code_postal == "") {
  //  alert('adresse non saisie');
    this.isAdresseValide = true;
 }
  else if(this.updateForm.value.no_civic == "" || this.updateForm.value.rue == "" 
  || this.updateForm.value.ville == "" || this.updateForm.value.province == "" 
  || this.updateForm.value.code_postal == "") {
    // alert('le no civic est nulle');
     this.isAdresseValide = false;
  }
}

  getUser(id) {
    this.userService.getUtilisateurByID(id).subscribe(data => {

      // Verifier le role de l'utilisateur
      this.tabUserbProProfile = data['data'];
      // this.urlDeImage=this.tabUserbProProfile.photo_utilisateur;
      console.log('this.tabUserbProProfile.role: ', this.tabUserbProProfile['role'])
      let verificationUser = this.tabUserbProProfile['role']
      console.log('verificationUser ',verificationUser)

      if (verificationUser === 'cherche')
      {
        console.log('je cherche')
        this.isUser = false;
        }
      console.log('tabUserbProProfile:', this.tabUserbProProfile)
      console.log('regions', this.tabUserbProProfile.regions)
      // console.log('Adresse:', this.tabUserbProProfile.adresses.code_postal, this.tabUserbProProfile.adresses[0].no_civic)
      console.log('Droit de pratique', this.tabUserbProProfile.droit_pratiques);
      console.log('categorie global', this.tabUserbProProfile.categorie_global);
      this.categorieGlobal = this.tabUserbProProfile.categorie_global;
      // this.tabRegions = this.tabUserbProProfile.user_pro.regions
      // this.tabDroitDePratique = this.tabUserbProProfile.user_pro.droit_pratiques;
      // this.tabEntreprise = this.tabUserbProProfile.user_pro.entreprises
      // console.log('this.tabEntreprise: ', this.tabEntreprise, 'entreprise ', this.tabUserbProProfile.user_pro.entreprises)
      this.cote = this.tabUserbProProfile.cote;
      console.log('Cote: ', this.cote)
      
      this.titre_profession = this.tabUserbProProfile.titre_profession;
      // this.biographie_description = this.tabUserbProProfile.user_pro.biographie_description;
      // this.telephone = this.tabUserbProProfile.telephone;
      // this.nom = this.tabUserbProProfile.nom;
      // this.prenom = this.tabUserbProProfile.prenom

       this.url_Linkedin = this.tabUserbProProfile.url_Linkedin;
      // this.url_Facebook = this.tabUserbProProfile.user_pro.url_Facebook;

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
      this.droit_pratiques = this.tabUserbProProfile.droit_pratiques
      // this.cote = this.tabUserbProProfile.cote;
      // this.titre_profession = this.tabUserbProProfile.titre_profession;
      // this.biographie_description = this.tabUserbProProfile.biographie_description;
      this.nbre_total_cote = this.tabUserbProProfile.nbre_total_cote;
       this.regions = this.tabUserbProProfile.regions
      // this.tabDroitDePratique = this.tabUserbProProfile.droit_pratiques;
      // this.tabEntreprise = this.tabUserbProProfile.entreprises;
      // this.categorieGlobal = this.tabUserbProProfile.categorie_global
      // this.status = this.tabUserbProProfile.status
      // this.url_Linkedin = this.tabUserbProProfile.url_Linkedin;
       this.url_Facebook = this.tabUserbProProfile.url_Facebook;

      // // Set reviews section
      // this.setReviews(this.cote);
      this.prenom = this.tabUserbProProfile.prenom
      // this.courriel = this.tabUserbProProfile.courriel;


      // Adresse section
       this.no_civic = this.tabUserbProProfile.no_civic;
      // console.log('this.no_civic', this.no_civic)
      // console.log('Je rentre dans la boucle longueur', this.tabUserbProProfile)

      // let longueur = this.tabUserbProProfile

      // for (let index = 0; index < longueur; index++) {
      
      this.rue = this.tabUserbProProfile.rue;
      this.ville = this.tabUserbProProfile.ville;
      this.province = this.tabUserbProProfile.province;
      this.code_postal = this.tabUserbProProfile.code_postal;





      //   const element = this.tabUserbProProfile.adresses[index];

      //   let no_civic = element.no_civic;
      //   let rue = element.rue;
      //   let ville = element.ville;
      //   let province = element.province;
      //   let code_postal = element.code_postal;
      //   let nom_entreprise = element.nom_entreprise;

      //   // 1355, boul des Laurentides, Vimont QC H7M 2Y2
      //   let adresseComplet = no_civic + ", " + rue + " " + ville + " " + province + " " + code_postal;
      //   console.log('Adresse complet ', adresseComplet)
      //   this.tableauAdressComplet[index] = {
      //     "no_civic": no_civic,
      //     "rue": rue,
      //     "ville": ville,
      //     "province": province,
      //     "code_postal": code_postal,
      //     "nom_entreprise": nom_entreprise
      //   };

      //   console.log('tableauAdressComplet : ', this.tableauAdressComplet)
      //   // console.log('Element', element)

      // }
      this.updateForm.setValue({
        nom: this.nom,
        prenom: this.prenom,
          categorie_global: this.categorieGlobal,
          no_certificat: this.no_de_certificat,
          no_BDNI: this.no_BDNI,
          numero_AMF: this.numero_AMF,
          titre_profession: this.titre_profession,
         honoraires: this.honoraires,
         biographie_description: this.biographie_description,
         site_web_url: this.site_web_url,
         url_Linkedin: this.url_Linkedin,
         url_Facebook: this.url_Facebook,
         regions: this.regions,
         droit_pratiques: this.droit_pratiques,
        courriel: this.courriel,
        telephone: this.telephone,
        no_civic: this.no_civic,
        rue: this.rue,
        ville: this.ville,
        province: this.province,
        code_postal: this.code_postal
        
        
        // rue: this.rue,
        // ville: this.ville,
        // province: this.province,
        // code_postal: this.code_postal,



        // no_civic: ['', [Validators.required]],
        // rue: ['', [Validators.required]],
        // ville: ['', [Validators.required]],
        // province: ['', [Validators.required]],
        // code_postal: ['', [Validators.required]],
        // nom_entreprise: ['', [Validators.required]],




        // phoneNumber: data['phoneNumber'],
      });


    });

  }

  // Getter to access form control
  get myForm() {
    console.log('get myForm', this.updateForm.controls);
    return this.updateForm.controls;
  }

  enregistrer() {
    this.submitted = true;

    console.log('AVANT condition - this.updateForm.value', this.updateForm.value)

    if (!this.updateForm.valid) {
      console.log('INVALIDE, get myForm', this.updateForm.controls);
      return false;
    } else {
      console.log('this.updateForm.value', this.updateForm.value)
      this.userService.updateUser(this.id, this.updateForm.value)
        .subscribe(res => {

          console.log('Content updated successfully!', res)
          location.reload();

          // Code pour afficher le nom modifie dans le header par Mahsa, bruno et abdel
          let userPro = res['data'];
          localStorage.setItem('User', JSON.stringify(userPro));

          // this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+userPro._id+'/'+userPro.nom+'/'+userPro.prenom))
          // Code pour afficher le nom modifie dans le header par Mahsa, bruno et abdel
        
      

        }, (error) => {
          console.log(error)
        })


      //  this.userService.getUser(this.updateForm.value['courriel']).subscribe(
      //   (res) => {
      //     console.log('User successfully read! ', res);
      //     //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))

      //     this.userPro = res['data'];
      //     localStorage.setItem('User', JSON.stringify(this.userPro));

      //     this.userService.dispatchCurrentUser(this.userPro)
      //     // localStorage.setItem()
      //     // this.userService.initCurrentUser().subscribe();

      //     this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+this.userPro._id+'/'+this.userPro.nom+'/'+this.userPro.prenom))
      //   //  this.location.go('/dashboard/'+this.userPro._id+'/'+this.userPro.nom+'/'+this.userPro.prenom)
      //   }, (error) => {
      //     console.log(error);
      //   });
    }

    console.log('form value courriel: ', this.updateForm.value['courriel'])
  }


  //UploadImage
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];

    this.previewImage(this.selectedFile)
    console.log(this.selectedFile);
  }

  previewImage(file) {

    console.log("Je suis dans previewImage");
    if (file.length === 0)
    {
      console.log("Erreur de Preview Image")
      return;
    }
      

    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.message_Photo = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }


  onUpload() {

    const fd = new FormData();
    fd.append('photo_utilisateur', this.selectedFile, this.selectedFile.name);
    console.log("Voici id ",this.id);
    //fd.append('id',this.id);
    //this.previewImage(this.selectedFile);

    this.userService.uploadImage(fd , this.id).subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          console.log('Upload Progress' + Math.round(event.loaded / event.total * 100) + '%')
         // this.previewImage(event)
        } else if (event.type == HttpEventType.Response) {
          console.log("Réponse de Upload Image", event);
         
        }

      });
  }

  //--------------------------Fin de Upload Image Functions







  AMF_ask() {
    console.log('Demande de verification a l\'AMF')
    switch(this.numero_AMF) {
      case "":
        alert('Veuillez enregistrer votre no de l\'AMF')
    break;
    default:
      alert('Merci votre demande sera traitée dans un délai de 24 heures.')
      }
  }



}
