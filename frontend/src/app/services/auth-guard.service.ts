import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';


@Injectable() // Nécessaire pour l'injection d'un service. (Ici, on injecte un service dans un service..!)

export class AuthGuard implements CanActivate{ // CanActivate est une interface qui oblige un certain format

    constructor(private userService: UserService,
                private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): Observable<boolean> | Promise<boolean> | boolean {

            // PRINCIPE DE GUARDE... (Pour empêcher navigation par exple vers une page si on n'est pas authentifiés...)

            if(this.userService.isAuth){
                return true;
            }
            else{
                this.router.navigate(['auth']);
            }

        }
        
    

}