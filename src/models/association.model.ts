import {IRegion} from './region.model';
import {Phone} from './phone.model';
import {IPicture} from './picture.model';
import {IUser} from './user.model';
import {IShippingType} from './shipping-type.model';
import {Base64Picture} from './base64.model';

export interface IAssociation {
    id?: string;
    name?: string;
    location?: string;
    regionId?: IRegion;
    websiteUrl?: string;
    associationTypeId?: number;
    shippingTypeId?: number;
    email?: string;
    base64Pictures?: Base64Picture[];
}
