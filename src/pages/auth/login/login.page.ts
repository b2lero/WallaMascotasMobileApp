import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPageComponent implements OnInit {
  static URL  = 'login';
  private pageTitle = 'Login';
  private loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log('-- Init Form w empty values--');
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  private login() {}

}
