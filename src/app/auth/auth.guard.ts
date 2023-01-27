import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, take, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService,
                private router: Router){}

    canActivate(router: ActivatedRouteSnapshot, rotuer: RouterStateSnapshot) : 
        | boolean 
        | UrlTree 
        | Promise<boolean | UrlTree> 
        | Observable<boolean | UrlTree> 
    {
        //Es un observable que retorna un objeto de usuario.
        //Modificamos la respuesta con pipe y map
        //User puede emitir datos mas de una vez y solo queremos escucharlo una vez
        return this.authService.user.pipe(
            take(1), //Tomamos el ultimo valor de user y nos desuscribimos.
            map(user => {
                const isAuth = !!user;
                if( isAuth ) return true;

                return this.router.createUrlTree(['/auth']);
                
               // return !!user; //old version
            }), //old version. produce condiciones de carrera en los
            //redireccionamientos
            // tap(isAuth => {
            //     if (!isAuth) 
            //         this.router.navigate['/auth']
            // })
        );
    }
}