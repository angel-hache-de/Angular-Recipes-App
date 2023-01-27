// import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    //Se necesitan aqui incluso para usarse en el rounting module
    //No importa que alla tambien se importen.
    //NO PODEMOS TENER MIEMBROS REPETIDOS DENTOR DE DECLARATIONS EN TODOS LOS
    //MODULOS, SE DECLARA UNA VEZ EN UN MODULO Y ESE SE COMPARTE A LOS DEMAS QUE 
    //LO NECESITEM
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeStartComponent, 
        RecipeEditComponent,
    ],
    imports: [
        // CommonModule,//reemplaza browser module y da *ngif y demas
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
    ],
    //Como ya solo necesitamos los componentes en determinadas ocasiones
    //(dependiendo de la ruta) ya los carga el routing, por ello ya no necesitamos
    //Exportarlos. Porque no los usamos directo, siempre con el routing
    // exports: [
    //     RecipesComponent,
    //     RecipeListComponent,
    //     RecipeDetailComponent,
    //     RecipeItemComponent,
    //     RecipeStartComponent,
    //     RecipeEditComponent,
    // ]
})
export class RecipesModule {}