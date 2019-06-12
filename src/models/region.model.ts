import {ICountry} from './country.model';

export interface IRegion {
    id?: string;
    name?: string;
    code?: string;
    country?: ICountry;
}
