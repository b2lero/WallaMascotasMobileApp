import {IRegion} from './region.model';
import {IPhone} from './phone.model';
import {IPicture} from './picture.model';
import {IUser} from './user.model';

export interface IAssociation {
    name: string;
    location: string;
    region: IRegion;
    email: Array<string>;
    phones: Array<IPhone>;
    pictures: Array<IPicture>;
    members: Array<IUser>;
}
