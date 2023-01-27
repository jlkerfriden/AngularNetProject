import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { UserLoginDto } from '../_interfaces/dto/user-login.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  successfull = false;
  responseErrors: any;

  constructor(private fb: FormBuilder, private _authService: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.required])],
    });
  }

  ngOnInit(): void {
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  sendLogin(): void {

    this.submitted = true;

    Object.keys(this.loginForm.controls).forEach(field => {
      this.loginForm.get(field)?.markAsTouched({ onlySelf: true });
    });

    if (this.loginForm.valid) {

      var strEmail = this.loginForm.get('email')?.value;
      var strPassword = this.loginForm.get('password')?.value;

      var userRegistration: UserLoginDto = {
        email: strEmail,
        password: strPassword
      }

      this._authService.login(userRegistration).subscribe({
        next: (_userLoginResp) => {
          console.log("Successful login");
          localStorage.setItem("token", _userLoginResp.token);
          this.successfull = true;

          var roles = this._authService.getRoles();
          this._authService.authStateChangeNotif({
            isAuth: _userLoginResp.isSuccess,
            roles: roles
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.error.errors);
          this.responseErrors = err.error.errors;
          this._authService.authStateChangeNotif({
            isAuth: false,
            roles: []
          });
        }
      });
    }
  }

}
