import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Utilisateur} from '../models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  private currentUser = new Subject<Utilisateur>();

  constructor(private http: HttpClient) { }

  createUser(data): Observable<Utilisateur> {
    console.log('User service frontend data ',data);
    let url = `${this.baseUri}/create_utilisateur`;

    return this.http.post<Utilisateur>(url, data);
    // return this.http.post(url, data)
    //   .pipe(
    //     catchError(this.errorMgmt)
    //   )
  }

  updateUser(id,data): Observable<Utilisateur> {
    // console.log('User service frontend data ',data,'id:', id);
    let url = `${this.baseUri}/update_utilisateur/${id}`;
    var temp = this.http.put<Utilisateur>(url, data).subscribe((res) => {
      
      console.log('User service frontend data ',res['data'],'id:', id);
    })
    return this.http.put<Utilisateur>(url, data);
    // return this.http.post(url, data)
    //   .pipe(
    //     catchError(this.errorMgmt)
    //   )
  }

  // updateEmployee(id, data): Observable<any> {
  //   let url = `${this.baseUri}/update/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }


  // Get user (email)
  getUser(courriel): Observable<any> {
    let url = `${this.baseUri}/get_utilisateur_courriel/${courriel}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Méthode allant récupérer tous les utilisateurs
  getAllUser() {
    let url = `${this.baseUri}/get_utilisateurs/`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  getUserPro_droit_region(droit_pratiques,regions):Observable<Utilisateur[]>{
    let url = `${this.baseUri}/get_utilisateurs_pro/${droit_pratiques}/${regions}`;
    return this.http.get<Utilisateur[]>(`${url}/`);
  }

  //Get User :  Authentification de l'utilisateur
  getAuthUser(data): Observable<Utilisateur> {
      
    let url = `${this.baseUri}/authentification_utilisateur`;

    //console.log('Je suis dans la service function getAuthUser, Voici les données',data)

    return this.http.post<Utilisateur>(`${url}`,data);
   
  }

  //***nouvelle function du service get by id */
  getUtilisateurByID(id): Observable<Utilisateur> {
    // let url = `${this.baseUri}/get_utilisateur_by_id/${id}`;
    // return this.http.get(url, {headers: this.headers}).pipe(
    //   map((res: Response) => {
    //     return res || {}
    //   }),
    //   catchError(this.errorMgmt)
    // )

    let url = `${this.baseUri}/get_utilisateur/${id}`;

    return this.http.get<Utilisateur>(url);
  }


  //Upload Photo_utilisateur

uploadImage(data , id):Observable<any>{
  
  let url = `${this.baseUri}/upload_image/${id}`;
 
  return this.http.post(url, data,
    {
      reportProgress: true,
      observe: 'events'
    })

}




  // initCurrentUser(): Observable<Utilisateur> {
  //   console.log('je suis dans le init user',this.userData.getCurrentUser());
  //   return this.userData.getCurrentUser()
  //         .pipe(tap((user: Utilisateur) => {
  //           console.log('frontend function init-user ',user);
  //             if (user) {
  //               this.userStore.setUser(user);

            
  //             }
  //         }));
  // }



  // // Get all employees
  // getEmployees() {
  //   return this.http.get(`${this.baseUri}`);
  // }

  

  // // Update employee
  // updateEmployee(id, data): Observable<any> {
  //   let url = `${this.baseUri}/update/${id}`;
  //   return this.http.put(url, data, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // // Delete employee
  // deleteEmployee(id): Observable<any> {
  //   let url = `${this.baseUri}/delete/${id}`;
  //   return this.http.delete(url, { headers: this.headers }).pipe(
  //     catchError(this.errorMgmt)
  //   )
  // }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  //******** Authentification */

  isAuth = false; // État d'authentification de l'utilisateur; par défaut à false.

    signIn(){ // Méthode signIn pour la connexion de l'utilisateur

        // Simulation du temps que prendrait un appel HTTP...
        return new Promise( // Cette Promise va se résoudre au bout de 2 secondes
            (resolve, reject) => {
              setTimeout(
                () => {
                  this.isAuth = true; // On va connecter l'utilisateur
                  resolve(true);
                }, 2000
              );
            }
        );
    }

    signOut(){
        this.isAuth = false; // N'a pas besoin d'être asynchrone cette fois
    }
  
    
      
    dispatchCurrentUser(user: Utilisateur){
      this.currentUser.next(user);
    }
    
    handleCurrentUser(){
      return this.currentUser.asObservable();
    }

  //************************** */


// ******* Local storage function test


  getCurrentUser():string {
    
    return localStorage.getItem('User')
    
  
  }

  logout() {
    localStorage.removeItem('User')
  }
}





