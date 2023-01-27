import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //Esto pide a angular cargar solo cuando se visite la ruta
  //Se baja en otro bundle
  { 
    path: 'recipes', 
    loadChildren: 
        () => import('./recipes/recipes.module').then(
            m => m.RecipesModule
        ) 
  },
  { 
    path: 'shopping-list', 
    loadChildren: 
        () => import('./shopping-list/shopping-list.module').then(
            m => m.ShoppingListModule
        ) 
  },
  { 
    path: 'auth', 
    loadChildren: 
        () => import('./auth/auth.module').then(
            m => m.AuthModule
        ) 
  }  
];


@NgModule({
  //Hace un preload de los lazy loading modules
  imports: [RouterModule.forRoot(appRoutes, {
    //Se cargan cuando navegamos por la pagina.
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}