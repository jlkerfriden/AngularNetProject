import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      var roles = this.authService.getRoles();
      this.authService.authStateChangeNotif({
        isAuth: true,
        roles: roles
      });
    }
  }
}
