import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    //Encuentra la primera ocurrencia de la directiva en el dom.
    @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
    
    private closeSub: Subscription;

    constructor(private authService: AuthService, 
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }
    //Cierra el modal
    onHandleError() {
        this.error = null;
    }

    onSubmit( form: NgForm ) {
        // console.log(form.value);
        if(!form.valid) return;
        
        this.error = null;
        const email = form.value.email;
        const password = form.value.password;
        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        if(this.isLoginMode){
            authObs = this.authService.login(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(
            responseData => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            errorMessage => {
                // console.error(error);
                console.log(errorMessage);
                this.isLoading = false;
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
            }
        );

        form.reset();
    }

    private showErrorAlert(error: string) { 
        // const aletCmp = new AlertComponent(); //Es un componente, no funciona esto
        //Angular crea el factory del componente
        const alertCmp = this.componentFactoryResolver
                                .resolveComponentFactory(AlertComponent);

        //Objeto que permite interactuar con un sitio en el dom.
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear(); //Limpia los componentes dentro del sitio

        //Referencia
        const componentRef = hostViewContainerRef.createComponent(alertCmp);
        //Data binding
        componentRef.instance.message = error;
        //Event binding
        this.closeSub = componentRef.instance.close.subscribe(
            () => {
                this.closeSub.unsubscribe();
                hostViewContainerRef.clear();
            }
        );
    }   

    ngOnDestroy() {
        if( this.closeSub ){
            this.closeSub.unsubscribe();
        }
    }
}