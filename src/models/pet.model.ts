import {IRegion} from './region.model';
import {IPicture} from './picture.model';
import {IPhone} from './phone.model';
import {IUser} from './user.model';
import {IPetType} from './pet-type.model';

export interface IPet {
    id?: string;
    name: string;
    birthDate: string;
    type: IPetType;
    mails?: Array<string>;
    description: string;
    breed?: string;
    isFemale?: boolean;
    pictures?: Array<IPicture>;
    hasChip?: boolean;
    phones: Array<IPhone>;
    user?: IUser;
    location?: string;
    region?: IRegion;
    creationUtcDateTime?: Date;
}
