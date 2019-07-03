import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CanActivate, Router} from '@angular/router';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {Storage} from '@ionic/storage';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {ToastController} from '@ionic/angular';
import {Headers} from '@angular/http';

@Injectable()
export class HttpService implements CanActivate {

    constructor(private http: HttpClient, private router: Router, private storage: Storage, public toastCtrl: ToastController) {
        this.resetOptions();
        this.checkTokenPhoneStorage();
    }

    static API_END_POINT = environment.API;
    static UNAUTHORIZED = 401;
    static NOT_FOUND = 404;

    private headers: Headers;
    private params: HttpParams;
    private responseType: string;
    private successfulNotification = undefined;
    private myToken;
    public authState = new BehaviorSubject(false);

    param(key: string, value: string): HttpService {
        this.params = this.params.append(key, value); // This class is immutable
        return this;
    }

    successful(notification = 'Successful'): HttpService {
        this.successfulNotification = notification;
        return this;
    }


    get(endpoint: string): Observable<any> {
        return this.http.get(HttpService.API_END_POINT + endpoint, this.createOptions()).pipe(
            map(response => this.extractData(response)
            ), catchError(error => {
                return this.handleError(error);
            })
        );
    }

    // tslint:disable-next-line:ban-types
    post(endpoint: string, body?: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + endpoint, body, this.createOptions()).pipe(
            map(response => {
                    return this.extractData(response);
                }
            ), catchError(error => {
                return this.handleError(error);
            })
        );
    }

    isAuthenticated() {
        return this.authState.asObservable();
    }

    // tslint:disable-next-line:ban-types
    login(endpoint: string, user: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + ApiEndpoint.USERS_AUTH, user).pipe(
            map(response => this.handleToken(response)
            ), catchError(err => {
                console.log('error caught', err);
                return this.handleError(err);
            })
        );
    }

    logout() {
        this.storage.clear();
        this.authState.next(false);
        this.router.navigate(['/home']);
    }

    canActivate(): boolean {
        if (this.authState.value === false) {
            this.presentToast('Not authenticated', 4000);
            this.router.navigate(['/home']);
        }
        return this.authState.value;
    }

    private header(key: string, value: string): HttpService {
        this.headers.append(key, value);
        return this;
    }

    private resetOptions(): void {
        this.headers = new Headers();
        this.responseType = 'json';
    }

    private createOptions(): any {
        const header: HttpHeaders = new HttpHeaders({
            Accept: 'application/json',
            Authorization: 'bearer ' + this.myToken,
            'Content-Type': 'application/json-patch+json',
        });
        return {headers: header, responseTYpe: 'json', observe: 'response'};
    }

    getToken() {
        return this.myToken;
    }

    private deleteToken() {
        this.myToken = null;
        this.storage.remove('token');
    }

    private setToken(token: string) {
        this.storage.set('token', token).then(
            data => this.myToken = data
        );
    }

    private handleToken(response) {
        const token = response.token;
        if (token) {
            console.log(token);
            this.setToken(token);
            this.authState.next(true);
        }
    }

    private extractData(response): any {
        if (this.successfulNotification) {
            this.presentToast(this.successfulNotification);
            this.successfulNotification = undefined;
        }
        const contentType = response.headers.get('content-type');
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.body; // with 'text': JSON.parse(response.body);
            }
        } else {
            return response;
        }
    }

    private checkTokenPhoneStorage() {
        this.storage.get('token').then(
            result => {
                if (result !== undefined) {
                    this.myToken = result;
                } else {
                    this.myToken = undefined;
                }
            }
        );
    }

    async presentToast(customMessage: string, time?: number, typeColor?: string) {
        const toast = await this.toastCtrl.create({
            message: customMessage,
            duration: 2000,
            position: 'bottom',
            color: typeColor || 'success'
        });
        toast.present();
    }

    private handleError(response): any {
        let error;
        if (response.status === HttpService.UNAUTHORIZED) {
            this.presentToast('Unauthorized', 3500, 'warning');
            this.router.navigate(['']);
            return throwError(response.error);
        } else {
            try {
                if (response.status === 400) {
                    error = {error: 'Bad Request', message: '', path: ''};
                    this.presentToast(error.error + ':' + error.message, 3000, 'warning');
                } else {
                    error = response.error; // with 'text': JSON.parse(response.error);
                }
                return throwError(error);
            } catch (e) {
                console.log('error' + e, 'No Server Response');
                return throwError(response.error);
            }
        }
    }
}

