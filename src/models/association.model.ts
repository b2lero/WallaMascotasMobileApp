import {IRegion} from './region.model';
import {Phone} from './phone.model';
import {IPicture} from './picture.model';
import {IUser} from './user.model';
import {IShippingType} from './shipping-type.model';

export interface IAssociation {
    id?: string;
    name: string;
    location: string;
    region?: IRegion;
    email: Array<string>;
    shippingType?: IShippingType;
    websiteUrl?: string;
    pictures: Array<IPicture>;
    userIds?: number[];
}
