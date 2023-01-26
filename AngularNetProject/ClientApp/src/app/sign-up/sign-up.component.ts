import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { matchValidator } from '../../validators/field-match-validator';
import { UserRegistrationDto } from '../_interfaces/UserRegistrationDto';
import { UserRegistrationResponseDto } from '../_interfaces/UserRegistrationResponseDto';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  http: HttpClient;
  baseUrl: string;
  signupForm: FormGroup;
  submitted = false;
  successfull = false;
  responseErrors: any;

  constructor(private fb: FormBuilder, private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string, private _authService: AuthenticationService) {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('passwordConfirm', true)])],
      passwordConfirm: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('password')])],
    });
    this.http = _http;
    this.baseUrl = _baseUrl;


    //const data = from(fetch(this.baseUrl + 'weatherforecast'));
    //data.subscribe({
    //  next(response) { console.log(response) }
    //});


    //this.http.get<number>(this.baseUrl + 'register').subscribe(result => {
    //  console.log(result);
    //}, error => console.error(error));
  }

  ngOnInit(): void {
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }
  get passwordConfirm() { return this.signupForm.get('passwordConfirm'); }

  sendSignup(): void {

    this.submitted = true;

    Object.keys(this.signupForm.controls).forEach(field => {
      this.signupForm.get(field)?.markAsTouched({ onlySelf: true });
    });

    if (this.signupForm.valid) {
      // API call
      this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast').subscribe(result => {
        console.log(result);
      }, error => console.error(error));

      const config = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
      var strEmail = this.signupForm.get('email')?.value;
      var strPassword = this.signupForm.get('password')?.value;

      var userRegistration: UserRegistrationDto = {
        email: strEmail,
        password: strPassword
      }
      //this.http.post<UserRegistrationResponseDto>(this.baseUrl + 'register', userRegistration, { headers: config }).subscribe(result => {
      //  console.log(result);
      //}, error => console.error(error));
      this._authService.signup(userRegistration).subscribe({
        next: (_) => {
          console.log("Successful registration");
          this.successfull = true;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.errors);
          this.responseErrors = err.error.errors;
        }
      });
    }
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
