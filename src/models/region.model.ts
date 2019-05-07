import {ICountry} from './country.model';

export interface IRegion {
    name?: string;
    code?: string;
    country?: ICountry;
}
