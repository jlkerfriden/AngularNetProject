import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.signupForm = this.fb.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required])],
      passwordConfirm: ['', Validators.compose([Validators.pattern('[a-zA-Z0-9 _-]*'), Validators.minLength(6), Validators.maxLength(20), Validators.required])],
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
    }
  }

}
