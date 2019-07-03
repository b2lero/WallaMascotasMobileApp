import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {ProServicesTypes} from '../models/service-types.model';

@Injectable()
export class ProfessionalServService {

    constructor(private httpService: HttpService) {
    }

    // GET /professional-service-types
    readAllProfessionalServicesTypes(): Observable<ProServicesTypes[]> {
        return this.httpService.get(ApiEndpoint.PROFESSIONAL_TYPES);
    }

    createProfessionalService(newService: any) {
        return this.httpService.successful('Servicio Enviado').post(ApiEndpoint.PROFESSIONAL_SERVICE, newService);
    }




}
