import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {User} from '../models/user.model';
import {ApiEndpoint} from '../shared/api-endpoint.model';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) {
    }

    // POST users/authenticate
    connect(credentials: User) {
        return this.httpService.login(ApiEndpoint.USERS_AUTH, credentials);
    }

}
