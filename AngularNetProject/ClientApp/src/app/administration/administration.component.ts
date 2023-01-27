import { Component } from '@angular/core';
import { AppUser } from '../_interfaces/model/app-user.model';
import { AdministrationService } from '../services/administration/administration.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html'
})
export class AdministrationComponent {
  public users: AppUser[] = [];

  constructor(private administrationService: AdministrationService) {

    this.administrationService.getAppUsers().subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}


