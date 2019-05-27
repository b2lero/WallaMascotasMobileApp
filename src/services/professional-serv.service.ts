import { Injectable } from '@angular/core';
import {HttpService} from '../core/http.service';
import {ApiEndpoint} from '../shared/api-endpoint.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class ProfessionalServService {

    constructor(private httpService: HttpService) {
    }

    // GET /professional-service-types
    readAllProfessionalServicesTypes() {
        return this.httpService.get(ApiEndpoint.PROFESSIONAL_TYPES).pipe(
            map( result => result.name)
        );
    }

    createProfessionalService(newService: any) {
        return this.httpService.successful('Servicio Enviado').post(ApiEndpoint.PROFESSIONAL_SERVICE, newService);
    }




}
