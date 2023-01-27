import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../../_interfaces/model/app-user.model';
import { HttpService } from '../http.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private httpService: HttpService) { }

  getAppUsers(): Observable<AppUser[]> {
    return this.httpService.get<AppUser[]>("administration");
  }
}
8
