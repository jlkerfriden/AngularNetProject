import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { matchValidator } from '../../validators/field-match-validator';

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

  constructor(private fb: FormBuilder, private _http: HttpClient, @Inject('BASE_URL') private _baseUrl: string) {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('passwordConfirm', true)])],
      passwordConfirm: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('password')])],
    });
    this.http = _http;
    this.baseUrl = _baseUrl;


    const data = from(fetch(this.baseUrl + 'weatherforecast'));
    data.subscribe({
      next(response) { console.log(response) }
    });
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
    }
  }

}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
