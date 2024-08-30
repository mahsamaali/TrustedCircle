import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { Avis} from '../models/avis';


@Injectable({
  providedIn: 'root'     
})
export class AvisService {
  baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // private currentAvis = new Subject<Avis>();         // ????? BV ?????

  constructor(private http: HttpClient) { }

  createAvis(data): Observable<Avis> {
    console.log('Avis service frontend data ',data);
    let url = `${this.baseUri}/create_avis`;
    return this.http.post<Avis>(url, data);
    // return this.http.post(url, data)
    //   .pipe(
    //     catchError(this.errorMgmt)
    //   )
  }

  
 // Get un avis avec id
  getAvisByID(id): Observable<Avis> {
    let url = `${this.baseUri}/get_avis/${id}`;
    return this.http.get<Avis>(url);
  }

  

  // Get Tous les avis d'un utilisateur
  getAvis(destination_id_FK): Observable<any> {
    let url = `${this.baseUri}/get_avis_utilisateur/${destination_id_FK}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }


//Update AvisPro by id
updateAvis(avis:Avis):Observable<Avis> {
  let url = `${this.baseUri}/update_avis/${avis._id}`;

 return this.http.put<Avis>(`${url}/`,avis);
}



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

}





