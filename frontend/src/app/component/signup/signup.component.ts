import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Utilisateur } from '../../models/utilisateur';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  messageErreur: boolean = false;
  messageErreurCourriel: boolean = false
  newEmail: boolean = true;


  submitted = false;
  userForm: FormGroup;
  userPro: Utilisateur;
  isIdentique: Boolean;
  // UserProTab:any = ['Immobilier', 'Assurance', 'Finance', 'Droit et fiscalité']

  constructor(public fb: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) {
    this.mainForm();
   }

  ngOnInit(): void {
  }
  mainForm() {
    this.userForm = this.fb.group({
      prenom: ['', [Validators.required,Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,30}$')]],
      nom: ['', [Validators.required,Validators.pattern('^[A-Za-z\u00C0-\u00FF][ \'\\-A-Za-z!-;\u00C0-\u00FF]{0,30}$')]],
      courriel: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]],
      courriel2: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]],
      mot_de_passe: ['', [Validators.required, Validators.pattern('^[ \'\\-A-Za-z!-;\u00C0-\u00FF]{8,15}$')]],
      role: ['', [Validators.required]]
      
    //   phoneNumber: ['', [Validators.pattern('^[0-9]+$')]]
     })
  }

  // Choose designation with select dropdown
  // updateProfile(e){
  //   this.userForm.get('categorie').setValue(e, {
  //     onlySelf: true
  //   })
  // }

  // Getter to access form control
  get myForm(){
    return this.userForm.controls;
  }

  onVerifyEmail() {
   
    // let courriel1 = this.userForm.value.courriel.length;
    // let courriel2 = this.userForm.value.courriel2.length;
    // console.log(courriel1, courriel2,this.userForm.controls.courriel.valid);


    if(this.userForm.controls.courriel.valid && 
    (this.userForm.value.courriel == this.userForm.value.courriel2)) {
        // console.log('Courriels identiques');
        this.isIdentique = true;
    }
    else {
      // console.log('Courriels non identiques');
      this.isIdentique = false;
    }
  }

  onSubmit() {

    
    // let categorie = this.searchExploreForm.value['categorie'];
    // let region = this.searchExploreForm.value['region'];

    let courriel = this.userForm.value['courriel'];
    let courriel2 = this.userForm.value['courriel2'];
    let mot_de_passe= this.userForm.value['mot_de_passe'];
  
    
    console.log("Affiche-moi pass:\t",mot_de_passe.length);
   
  //console.log("Voici les courriels : \t courriel1:",courriel, "\t courriel2 : ",courriel2)
    this.submitted = true;
    if (!this.userForm.valid) {
      // console.log('this.userForm.valid',this.userForm.valid)

      this.messageErreur = true;
      console.log('Je suis apres la condition this.messageErreur', this.messageErreur);

    } else {


      // if (courriel != courriel2)
      // {

      //   this.messageErreurCourriel = true;
      //   //console.log('courriel pas pareil',this.messageErreurCourriel)
      // }

      //else
      // {

          if(mot_de_passe.length<8){

          }
          console.log('this.userForm.value',this.userForm.value)
          this.userService.createUser(this.userForm.value).subscribe(
           (res) => {
             console.log('User successfully created!voici le user:', res['msg'])
             this.userPro = res['data'];
              //console.log('Voici le user Pro nouvellement cree est:',this.userPro._id)
              
              
              localStorage.setItem('User', JSON.stringify(this.userPro));
             
          
              this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+this.userPro._id+'/'+this.userPro.nom+'/'+this.userPro.prenom))
            }, (error) => {
              this.newEmail = false;
              console.log(error);
          });
          //:id/:nom/:prenom
        // }
    
      
    }

    console.log('form value: ',this.userForm.value)
  }


}
