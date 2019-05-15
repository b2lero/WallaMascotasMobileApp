import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) {
    }

    // Request Auth token
    login(credentials: User) {
        return this.httpService.post(ApiEndpoint.USERS_AUTH, credentials);
    }


}
