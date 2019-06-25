import {Base64Picture} from './base64.model';

export interface PetRequestModel {
     name?: string;
     location?: number;
     latitude?: number;
     longitude?: number;
     isFemale?: boolean;
     publicationStatusId?: number;
     petTypeId?: number;
     petCategoryId?: number;
     petSizeId?: number;
     regionId?: number;
     base64Pictures?: Base64Picture[];
     breed?: string;
     description?: string;
     birthDate?: Date;
     isInTreatment?: boolean;
     hasPppLicense?: boolean;
     isSterilized?: boolean;
     isPositiveInFelineImmunodeficiency?: boolean;
     isPositiveInLeismania?: boolean;
     isPositiveInLeukemia?: boolean;
     hasChip?: boolean;
     isVaccinated?: boolean;
}


