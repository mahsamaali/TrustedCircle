import { Component, OnInit, NgModuleFactoryLoader } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Avis } from 'src/app/models/avis';
import { Utilisateur } from 'src/app/models/utilisateur';
import { AvisService } from 'src/app/services/avis.service';

@Component({
  selector: 'app-review-sys',
  templateUrl: './review-sys.component.html',
  styleUrls: ['./review-sys.component.css']
})
export class ReviewSysComponent implements OnInit {

  id: String;
  prenom: string;
  user: Utilisateur;
  isMemeUtilisateur: Boolean;
  changeColor: boolean = false;
  rateNumber: number;
  imageAvis: String;
  avisForm: FormGroup;
  avis: Avis;
  cote: number;

  isConnecter: boolean;


  constructor(private actRoute: ActivatedRoute, public fb: FormBuilder, private avisService: AvisService) {
    this.mainForm();
  }

  ngOnInit(): void {


    //Pour recuperer le _id du profil ainsi que le id du createur d'avis**-------------------------
    // Par le Localstorage pour recupere le _id de l'utilisateur courant celui qui ajoute un avis

    this.user = JSON.parse(localStorage.getItem('User'));
    if (this.user == null) {
      this.isConnecter = false;
    } else {

      this.isConnecter = true;
      console.log('Je suis la personne qui met un avis je suis: ', this.user.prenom, ' ',
        this.user.nom, ' et mon id est: ', this.user._id)

      // Recuperer avec l'URL de la page c'est le _id du profil 

      this.id = this.actRoute.snapshot.paramMap.get('id');
      this.prenom = this.actRoute.snapshot.paramMap.get('prenom');
      console.log('Je suis dans le review system de ', this.prenom, ' avec le id', this.id)

      if (this.user._id == this.id) {
        this.isMemeUtilisateur = true;
      }

    }



  }

  mainForm() {
    this.avisForm = this.fb.group({
      // cote: [''],
      titre: ['', [Validators.required, Validators.maxLength(100)]],
      texte: ['', [Validators.required, Validators.maxLength(500)]]


      //   phoneNumber: ['', [Validators.pattern('^[0-9]+$')]]
    })
  }



  // Getter to access form control
  get myForm() {
    return this.avisForm.controls;
  }





  setReviews() {

    let theNumber = (<HTMLInputElement>document.querySelector('#numInput')).value;
    let numReview = parseFloat(theNumber);
    let color: string;
    if (isNaN(numReview)) {
      // alert('Veuillez donner un avis');
      theNumber = '0';
    }
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

    document.querySelector('#score').innerHTML = theNumber;
  }




  chgColor(num: number, change: boolean, color: string) {
    const circle = document.getElementsByClassName('circle-review') as HTMLCollectionOf<HTMLElement>;
    switch (change) {
      case true:
        this.changeColor = true;
        this.rateNumber = num + 1;
        for (let i = 0; i <= 4; i++) {
          circle[i].style.backgroundColor = 'lightgray';
        }
        break;

    }
    for (let i = 0; i <= num; i++) {
      if (change || !this.changeColor) {
        circle[i].style.backgroundColor = color;
      }

    }
  }


  rmvColor() {

    const circle = document.getElementsByClassName('circle-review') as HTMLCollectionOf<HTMLElement>;
    if (!this.changeColor) {
      for (let i = 0; i <= 4; i++) {
        circle[i].style.backgroundColor = 'lightgray';
      }
    }

  }

  rating() {
    let texte = (<HTMLInputElement>document.getElementById('texte')).value;
    if (isNaN(this.rateNumber)) {
      // alert('Veuillez donner votre avis');
    }

    else {

      //alert(`Vous avez donnée un avis de ${this.rateNumber} cercles de confiance`);
      //alert(texte);
    }

  }


  //------------------------------- Créer un avis Début-------------------------------
  onSubmit() {


    if (this.id == this.user._id) {
      console.log("Erreur! Les Id sont pareils");

    } else {

      let texteCommentaire = (<HTMLInputElement>document.getElementById('texte')).value;
      let titreCommentaire = (<HTMLInputElement>document.getElementById('titre')).value;
      if (this.rateNumber == 1) {
        this.imageAvis = "avis 1.png";
      } else if (this.rateNumber == 2) {
        this.imageAvis = "avis 2.png"
      }
      else if (this.rateNumber == 3) {
        this.imageAvis = "avis 3.png"
      }
      else if (this.rateNumber == 4) {
        this.imageAvis = "avis 4.png"
      }
      else if (this.rateNumber == 5) {
        this.imageAvis = "avis 5.png"
      }


      console.log()

      console.log("Voici la commentaire", texteCommentaire);
      var avisJson = {
        destination_id_FK: this.id,
        cote_evaluation: this.rateNumber,
        titre: titreCommentaire,
        type: "A",
        origine_id_FK: this.user._id,
        texte: texteCommentaire,
        imageAvis: this.imageAvis

      }

      this.avisService.createAvis(avisJson).subscribe((res) => {
        console.log("Réponse est : ", res)
      })

      location.reload();
    }








  }

  //--------------------------------Créer un avis Fin----------------------------------------

}
