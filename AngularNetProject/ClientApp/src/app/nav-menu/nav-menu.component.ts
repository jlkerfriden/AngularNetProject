import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  isAuth = false;
  isRolePremium = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.authChangedObs
      .subscribe(res => {
        this.isAuth = res.isAuth;
        this.isRolePremium = res.roles.indexOf("Premium") >= 0;
        console.log(this.isRolePremium);
        //this.isRolePremium = res.roles === "Premium";
      })
  }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout = () => {
    this.authService.logout();
  }
}
