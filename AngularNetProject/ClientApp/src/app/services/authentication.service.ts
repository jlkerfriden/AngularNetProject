import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserStatus } from '../_interfaces/UserStatus';
import { UserLoginDto } from '../_interfaces/UserLoginDto';
import { UserLoginResponseDto } from '../_interfaces/UserLoginResponseDto';
import { UserRegistrationDto } from '../_interfaces/UserRegistrationDto';
import { UserRegistrationResponseDto } from '../_interfaces/UserRegistrationResponseDto';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authChangeSubject = new Subject<UserStatus>();

  public authChangedObs = this.authChangeSubject.asObservable();


  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private jwtHelper: JwtHelperService) { }

  public signup = (userRegistration: UserRegistrationDto) => {
    const config = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post<UserRegistrationResponseDto>(this.baseUrl + 'register', userRegistration, { headers: config });
  }

  public login = (userLogin: UserLoginDto) => {
    const config = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    return this.http.post<UserLoginResponseDto>(this.baseUrl + 'login', userLogin, { headers: config });
  }

  public authStateChangeNotif = (userStatus: UserStatus) => {
    this.authChangeSubject.next(userStatus);
  }

  public isAuthenticated = (): boolean => {
    const token = localStorage.getItem("token");
    return (token != null && !this.jwtHelper.isTokenExpired(token));
  }

  //public isRolePremium = (): boolean => {
  //  const token = localStorage.getItem("token");
  //  var role;
  //  if (token != null) {
  //    const decodedToken = this.jwtHelper.decodeToken(token);
  //    role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  //  }

  //  console.log(role === "Premium");
  //  return role === "Premium";
  //}

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
