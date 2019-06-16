import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {HttpService} from '../../../../core/http.service';
import {FacebookService} from '../../../../services/facebook.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    static URL = 'login';
    private pageTitle = 'Login';
    private loginForm: FormGroup;
    private submitted = false;
    userData: any;

    constructor(private formBuilder: FormBuilder,
                private loginService: UserService,
                private httpService: HttpService,
                private fbService: FacebookService,
                private router: Router) {
    }

    get email() {
        return this.loginForm.get('email');
    }

    get password() {
        return this.loginForm.get('password');
    }

    ngOnInit() {
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
            const credentials = {mail, password, type: 'Vanilla'};

            this.loginService.connect(credentials).subscribe(
                () => {
                    console.log('Connection OK');
                    this.router.navigate(['home']);
                },
                () => {},
                () => this.router.navigate(['home'])
            );
        }
    }

    loginFB() {
        this.fbService.facebookConnect();
    }
}
