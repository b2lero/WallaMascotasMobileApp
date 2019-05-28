import {IRole} from './role.model';
import {IRegion} from './region.model';
import {IPicture} from './picture.model';
import {IFunction} from './function.model';
import {IPhone} from './phone.model';

export interface IUser {
    name?: string;
    surname?: string;
    lastSurname?: string;
    location?: string;
    mail: string;
    password?: string;
    role?: IRole;
    region?: IRegion;
    picture?: IPicture;
    creationDate?: Date;
    functions?: Array<IFunction>;
    phones?: Array<IPhone>;
}
