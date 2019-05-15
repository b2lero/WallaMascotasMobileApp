import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {CanActivate, Router} from '@angular/router';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {Storage} from '@ionic/storage';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class HttpService implements CanActivate {
    static API_END_POINT = environment.API;
    static UNAUTHORIZED = 401;
    static NOT_FOUND = 404;

    private headers: HttpHeaders;
    private params: HttpParams;
    private responseType: string;
    private successfulNotification = undefined;
    private myToken;
    public authState = new BehaviorSubject(false);

    constructor(private http: HttpClient, private router: Router, private storage: Storage) {
        this.resetOptions();
    }


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
            map(response => this.extractData(response)
            ), catchError(error => {
                return this.handleError(error);
            })
        );
    }

    isAuthenticated() {
        return this.authState.value;
    }

    // tslint:disable-next-line:ban-types
    login(endpoint: string,  user: Object): Observable<any> {
        return this.http.post(HttpService.API_END_POINT + ApiEndpoint.USERS_AUTH, user, this.createOptions()).pipe(
            map(response => this.extractData(response)
            ), catchError (err => {
                return this.handleError(err);
            })
        );
    }

    logout() {
        this.storage.remove('USER_INFO').then(() => {
                this.router.navigate(['home']);
                this.authState.next(false);
            }
        );
    }

    canActivate(): boolean {
        return this.isAuthenticated();
    }

    private header(key: string, value: string): HttpService {
        this.headers = this.headers.append(key, value); // This class is immutable
        return this;
    }

    private resetOptions(): void {
        this.headers = new HttpHeaders();
        this.params = new HttpParams();
        this.responseType = 'json';
    }

    private createOptions(): any {
        const options: any = {
            headers: this.headers,
            params: this.params,
            responseType: this.responseType,
            observe: 'response'
        };
        this.resetOptions();
        return options;
    }

    private getToken() {
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

    private extractData(response): any {
        const contentType = response.headers.get('content-type');
        const token = response.body.token;
        if (token) {
            this.setToken(token);
            this.storage.set('USER_INFO', {user_id: response.body.user.id, username: response.body.user.name});
            this.authState.next(true);
        }
        if (contentType) {
            if (contentType.indexOf('application/json') !== -1) {
                return response.body; // with 'text': JSON.parse(response.body);
            }
        } else {
            return response;
        }
    }

    private handleError(response): any {
        let error;
        if (response.status === HttpService.UNAUTHORIZED) {
            // this.snackBar.open('Unauthorized', 'Error', {
            //   duration: 2000
            // });
            console.log('Unauthorized');
            this.router.navigate(['']);
            return throwError(response.error);
        } else {
            try {
                if (response.status === HttpService.NOT_FOUND) {
                    error = {error: 'Not Found', message: '', path: ''};
                } else {
                    error = response.error; // with 'text': JSON.parse(response.error);
                }
                console.log('NOT FOUND');
                console.log(error);
                return throwError(error);
            } catch (e) {
                console.log('error' + e, 'No Server Response');
                return throwError(response.error);
            }
        }
    }
}

