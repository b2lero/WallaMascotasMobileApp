import {IRegion} from './region.model';

interface Picture {
    url: string;
}

export interface IPet {
    id?: string;
    name: string;
    age: number;
    description: string;
    breed: string;
    pictureUrl?: Picture;
    location?: string;
    region?: IRegion;
}
