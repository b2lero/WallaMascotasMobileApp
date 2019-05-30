import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {IUser} from '../models/user.model';

@Injectable()
export class UserService {

    constructor(private httpService: HttpService) {
    }

    // POST users/authenticate
    connect(credentials: IUser) {
        return this.httpService.login(ApiEndpoint.USERS_AUTH, credentials);
    }

    // User Pets
    readAllPetsByUserId(id, request) {
        return this.httpService.post(ApiEndpoint.USERS + id + '/pets/pages', request);
    }

}
