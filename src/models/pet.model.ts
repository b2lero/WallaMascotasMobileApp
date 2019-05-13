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

export interface IPet {
    id?: string;
    name: string;
    age: number;
    type: PetType;
    description: string;
    breed?: string;
    pictures?: Picture[];
    user?: User;
    location?: string;
    region?: IRegion;
    creationUtcDateTime?: Date;
}
