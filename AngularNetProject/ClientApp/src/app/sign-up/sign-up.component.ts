import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { matchValidator } from '../../validators/field-match-validator';
import { UserRegistrationDto } from '../_interfaces/dto/user-registration.dto';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  successfull = false;
  responseErrors: any;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('passwordConfirm', true)])],
      passwordConfirm: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required, matchValidator('password')])],
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

      var strEmail = this.signupForm.get('email')?.value;
      var strPassword = this.signupForm.get('password')?.value;

      var userRegistration: UserRegistrationDto = {
        email: strEmail,
        password: strPassword
      }

      this.authService.signup(userRegistration).subscribe({
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
