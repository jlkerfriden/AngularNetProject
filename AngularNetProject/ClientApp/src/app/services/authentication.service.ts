import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from './http.service';
import { UserStatus } from '../_interfaces/model/user-status.model';
import { UserLoginDto } from '../_interfaces/dto/user-login.dto';
import { UserLoginResponseDto } from '../_interfaces/dto/user-login-response.dto';
import { UserRegistrationDto } from '../_interfaces/dto/user-registration.dto';
import { UserRegistrationResponseDto } from '../_interfaces/dto/user-registration-response.dto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSubject = new Subject<UserStatus>();

  public authChangedObs = this.authChangeSubject.asObservable();


  constructor(private httpService: HttpService, private jwtHelper: JwtHelperService) { }

  public signup = (userRegistration: UserRegistrationDto) => {
    return this.httpService.post<UserRegistrationResponseDto>('register', userRegistration);
  }

  public login = (userLogin: UserLoginDto) => {
    return this.httpService.post<UserLoginResponseDto>('login', userLogin);
  }

  public authStateChangeNotif = (userStatus: UserStatus) => {
    this.authChangeSubject.next(userStatus);
  }

  public isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return (token != null && !this.jwtHelper.isTokenExpired(token));
  }

  public getRoles = (): string[] => {
    const token = localStorage.getItem("token");
    var roles;
    if (token != null) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }

    return roles;
  }

  public logout = () => {
    localStorage.removeItem("token");
    this.authStateChangeNotif({
      isAuth: false,
      roles: []
    });
  }
}
