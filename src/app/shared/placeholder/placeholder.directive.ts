import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'//Atribute selector
})

export class PlaceholderDirective {
    //Obtenemos acceso a un lugar del dom y varios metodos sobre el, como crear componentes.
    constructor(public viewContainerRef: ViewContainerRef){

    }
}