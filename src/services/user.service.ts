import {Injectable} from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {IUser} from '../models/user.model';

@Injectable()
export class UserService {

    private facebookToken;

    constructor(private httpService: HttpService) {
    }

    // POST users/authenticate
    connect(credentials: IUser) {
        return this.httpService.successful('Conectado').login(ApiEndpoint.USERS_AUTH, credentials);
    }

    isConnected() {
        return this.httpService.isAuthenticated();
    }

    // User Pets
    readAllPetsByUserId(id, request) {
        return this.httpService.post(ApiEndpoint.USERS + id + '/pets/pages', request);
    }


}
