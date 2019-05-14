import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  static URL  = 'login';
  private pageTitle = 'Login';
  private loginForm: FormGroup;
  private submitted =  false;

  constructor(private formBuilder: FormBuilder) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    console.log('-- Init Form w empty values--');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['']
      // Todo password validation still to be added
    });
  }

  private onSubmit(form: FormGroup) {
    this.submitted = true;
  }

}
