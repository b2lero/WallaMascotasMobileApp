import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';

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

  constructor(private formBuilder: FormBuilder, private loginService: UserService) { }

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
    
    if (this.loginForm.valid) {
      const mail = this.email.value;
      const password = this.password.value;
      const credentials = { mail, password, type: 'Vanilla'};

      this.loginService.login(credentials).subscribe(
        res => {
          console.log(res);
        },
          (e) => {
          console.log('Error', e);
          },
          () => {

          }
      );

    }
  }

}
