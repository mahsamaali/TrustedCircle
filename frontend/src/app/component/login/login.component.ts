import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Utilisateur } from 'src/app/models/utilisateur';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageErreur: boolean = false;
  connex: boolean = true;
  loading = false;

  submitted = false;
  userForm: FormGroup;

  userPro: Utilisateur;


  constructor(public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
  private location: Location) { 
    this.mainForm();
  }

  ngOnInit(): void {
  }

  mainForm() {
    this.userForm = this.fb.group({
      
      courriel: ['', [Validators.required, Validators.email]],
      // courriel: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$')]],
      mot_de_passe: ['', [Validators.required]],

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

  onSubmit() {
    console.log('je soumet login')
    this.loading = true;
    this.submitted = true;
    if (!this.userForm.valid) {
      this.connex = false;
      console.log('Erreur de saisie')
      return false;
    } else {
      console.log('this.userForm.value',this.userForm.value)
      this.userService.getAuthUser(this.userForm.value).subscribe(
        (res) => {
          console.log('User successfully read! ', res);
          //this.ngZone.run(() => this.router.navigateByUrl('/employees-list'))
         
      if(res['isAuth']){
          this.userPro = res['data'];
          this.connex = true;
          console.log('this.userPro',this.userPro)
           if (this.userPro!== null) {
             localStorage.setItem('User', JSON.stringify(this.userPro));
             this.userService.dispatchCurrentUser(this.userPro)
          // localStorage.setItem()
          // this.userService.initCurrentUser().subscribe();

          this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+this.userPro._id+'/'+this.userPro.nom+'/'+this.userPro.prenom))
           }
           else {
             this.messageErreur = true
            }
          }
          else {
            this.connex = false;
          }
          
          
          
          //  this.location.go('/dashboard/'+this.userPro._id+'/'+this.userPro.nom+'/'+this.userPro.prenom)
        }, (error) => {
          console.log('error: ',error);
        });
    }

    console.log('form value courriel: ',this.userForm.value['courriel'])
  }

}
