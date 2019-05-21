import {IRegion} from './region.model';

interface Picture {
    url: string;
}

interface Phone {
    countryCode: string;
    number: string;
}

interface User {
    name: string;
    surname: string;
    mail: string;
    phones: Phone[];
}

interface PetType {
    id?: string;
    name: string;
}

interface IPhone {
    id?: string;
    countryCode?: string;
    number: string;
    description?: string;
}

export interface IPet {
    id?: string;
    name: string;
    birthDate: string;
    type: PetType;
    mails?: Array<string>;
    description: string;
    breed?: string;
    isFemale?: boolean;
    pictures?: Array<Picture>;
    hasChip?: boolean;
    phones: Array<IPhone>;
    user?: User;
    location?: string;
    region?: IRegion;
    creationUtcDateTime?: Date;
}
