import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html'
})
export class AdministrationComponent {
  public users: AppUser[] = [];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<AppUser[]>(baseUrl + 'appuser').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}

interface AppUser {
  email: string;
  name: string;
}
