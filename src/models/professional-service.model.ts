import {Base64Picture} from './base64.model';

export interface ProfessionalService {
    name: string;
    associationId?: string;
    regionId?: string;
    location: string;
    rectifiedServiceId?: string;
    description?: string;
    email?: string;
    base64Pictures: Base64Picture[];
    professionalServiceTypeIds?: number[];
}
