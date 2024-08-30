import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

// import { UserData, Utilisateur } from './models/utilisateur';
import { Utilisateur } from './models/utilisateur';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // pour le menu mobile
  public isCollapsed = true;

  
  isUser: Boolean = true;
  title = 'trusted-circles';
  nom: String;
  nomHeader: String;
  prenom: String;
  id: String;
  user: Utilisateur;
  userPourImage: String;
  isAvatar: Boolean = false;
  isConnected: Boolean =false;
  isNotConnected: Boolean = true;
  photo_utilisateur: String;


  // constructor(private userData: UserData) {
  constructor(private userService: UserService, private ngZone: NgZone,private router: Router) {
    
  }

  ngOnInit(): void {
    //this.initUser();
    this.user = JSON.parse(localStorage.getItem('User'));
    if (this.user != null)
    {
      
      this.isNotConnected = false;
      this.user = JSON.parse(this.userService.getCurrentUser())
      this.nomHeader = this.user.prenom + ' ' + this.user.nom

      this.photo_utilisateur = this.user.photo_utilisateur

      console.log('photo_utilisateur25 ', this.photo_utilisateur)
      console.log('Avant je verifie le role ', this.user.role)
      this.isConnected = true;
      if (this.user.role == 'cherche')
      {
        console.log('si condition je verifie le role ',this.user.role)
        this.isUser = false;
      }
      // else {
      //   this.isConnected = true;
      // }
  
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
      this.id = this.user._id;
      this.userService.getUtilisateurByID(this.id)
        .subscribe(data => {
          console.log('data : app.component.ts', data)
          this.userPourImage = data['data'].photo_utilisateur;
          console.log('userPourImage', this.userPourImage);
          this.photo_utilisateur = this.userPourImage;
        })
      
      }
    console.log('localstorage:',this.user)
    // this.userService.handleCurrentUser()
    //   .subscribe(user => {
    //     console.log("User (dans frontend/app.component.ts) : ", user);
    //     console.log('localstorage:',this.user)
        
    //     this.nom = user.prenom + user.nom;
    
    //   })
   
    
   
  }

  logout() {
    console.log('je deconnecte')
    this.userService.logout();
    this.ngZone.run(() => this.router.navigateByUrl('/home'))
    // window.location.reload();
    
   
  }

  goToDashboard() {
    this.ngZone.run(() => this.router.navigateByUrl('/dashboard/'+this.id+'/'+this.nom+'/'+this.prenom))
  }

  
  goToProfile() {
    this.ngZone.run(() => this.router.navigateByUrl('/profile/'+this.id+'/'+this.nom+'/'+this.prenom))
  }


  }

  // initUser() {
  //   this.userData.getCurrentUser().pipe(tap((user: Utilisateur) => {
  //     if (user) {
  //       console.log("Cool");
  //     }
  //   }));
  // }

  


