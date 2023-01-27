import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";

import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            //Se hace aqui porque solo es una ruta
            { path: '', component: ShoppingListComponent, }
        ]),
        //Si solo se reemplaza un module no tiene sentido,
        //Aqui solo fue el commonModule, pero tambien agregamos los componentes.
        SharedModule
    ]
})
export class ShoppingListModule {}