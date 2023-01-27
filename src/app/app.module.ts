import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
// import { AuthComponent } from './auth/auth.component';

// import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { CoreModule } from './core.module';
import { AuthModule } from './auth/auth.module';
// import { SharedModule } from './shared/shared.module';

@NgModule({
  //Todo lo que se use en templates debe ser importado
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [  
    //Este solo debe se usarse una vez
    BrowserModule,
    //Este provee SOLO SERVICIOS que si estan disponibles en toda la app 
    HttpClientModule,
    AppRoutingModule, 
    //Componentes declarados en otros modulos no tienen acceso a
    //estos moodulos
    // RecipesModule, //Ya se importa en lazy
    // ShoppingListModule, //Ya se importa en lazy
    //En teoria el header utiliza la dropdown directive, pero
    //En nuestro caso no se ocupa pa
    // SharedModule 
    CoreModule,
    // AuthModule //Ya se importa en lazy
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
