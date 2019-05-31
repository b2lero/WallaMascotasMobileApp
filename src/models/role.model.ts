import {IFunction} from './function.model';

export interface IRole {
    name: string;
    defaultFunctions: Array<IFunction>;
}
