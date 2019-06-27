import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {IAssociation} from '../models/association.model';


@Injectable()
export class AssociationService {

    constructor(private httpService: HttpService) {
    }

    createAssociation(requestBody: object): Observable<any> {
        return this.httpService.post(ApiEndpoint.ASSOCIATIONS, requestBody);
    }

    readAssociationById(id): Observable<any> {
        return this.httpService.get(ApiEndpoint.ASSOCIATIONS + '/' + id);
    }

    readAllAssociations(requestBody): Observable<any> {
        return this.httpService.post(ApiEndpoint.ASSOCIATIONS_PAGES, requestBody);
    }

    readAssociationTypes() {
        return this.httpService.get(ApiEndpoint.ASSOCIATIONS_TYPES);
    }

    readShippingTypes() {
        return this.httpService.get(ApiEndpoint.SHIPPING_TYPES);
    }
}
