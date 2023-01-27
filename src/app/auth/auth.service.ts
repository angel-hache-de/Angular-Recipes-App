import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { Router } from "@angular/router";
import { User } from "./user.model";
import { environment } from "src/environments/environment";


export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // user = new Subject<User>();//next when login o logut
    // Se comporta como el otro. La diferencia es que tambien da a los subscribers
    //acceso inmediato al valor emitido previamente, incluso si no se habian suscrito
    //cuando se emitio ese valor
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;

    constructor(private http: HttpClient,
                private router: Router){}
    signUp(email: string, password: string){
        return this.http
                .post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+ environment.firebaseAPIKEy,
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                ).pipe(catchError(this.handleError), tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.idToken,
                        +resData.expiresIn,
                        resData.localId,
                    )
                }))
    }

    login(email: string, password: string) {
        return this.http
                .post<AuthResponseData>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKEy,
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                ).pipe(catchError(this.handleError), tap(resData => {
                    this.handleAuthentication(
                        resData.email,
                        resData.idToken,
                        +resData.expiresIn,
                        resData.localId,
                    )
                }))
                //Map modifica la respuesta
                //Tap ejecuta codigo sin modificar la respuesta
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if( !userData ) return;

        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate),
        );

        if( loadedUser.token ) {
            this.user.next(loadedUser);
            //Calculando la expiracion del token.
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - //Miliseconds
                new Date().getTime(); //Miliseconds

            this.autoLogout(
                expirationDuration
            );
        }
    }

    //Aqui se hace el redireccionamiento porque se ocupa en varias partes de la app
    //A diferencia del login que solo ocurre en auth component
    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer)
            clearTimeout(this.tokenExpirationTimer);

        this.tokenExpirationTimer = null;

    }

    autoLogout(expirationDuration: number){ //Miliseconds) {
        console.log('expD: ' + expirationDuration);
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(
        email: string,
        token: string,
        expiresIn: number,
        userId: string)
    {
            const expirationDate = new Date(
                new Date().getTime() + expiresIn * 1000 //Convierte en milis segundos.
            );

            const user = new User(
                email,
                userId,
                token,
                expirationDate
            );

            this.user.next(user);
            this.autoLogout(expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An error ocurred';

        if( !errorResponse.error || !errorResponse.error.error ){
            return throwError(errorMessage);
        }
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'this email already exists';
                break;
            case 'EMAIL_NOT_FOUND' || 'INVALID_PASSWORD':
                errorMessage = 'wrong data';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'wrong data';
                break;
            default:
        }
        return throwError(errorMessage);
    }
}
