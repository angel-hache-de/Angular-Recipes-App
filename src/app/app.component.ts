import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { LogginService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'proyecto';

  constructor(private authService: AuthService, 
              private logginService: LogginService) {}
  // showRecipes = true;
  // showShoppingList = false;
  // onShowComponent(componentNumber: number) {
  //   if (componentNumber === 0) {
  //     this.showRecipes = true;
  //     this.showShoppingList = false;
  //   } else {
  //     this.showRecipes = false;
  //     this.showShoppingList = true;
  //   }
  // }

  ngOnInit() {
    this.authService.autoLogin();
    this.logginService.printLog('Hello from App component');
  }

}
