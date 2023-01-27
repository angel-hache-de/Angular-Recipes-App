import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // @Output() showComponent = new EventEmitter<number>();
  dropdownOpen = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, 
              private authService: AuthService) {}

  // onShowComponent(componentNumber: number) {
  //   this.showComponent.emit(componentNumber);
  // }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      (user: User) => {
        // this.isAuthenticated = !user ? false: true;
        this.isAuthenticated = !!user;
      } 
    );
  }

  onSaveData(){
    this.dataStorageService.storeRecipes();
  } 
  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
