export interface AssociationPageRequest {
    page: string;
    pageSize: string;
    name?: string;
    location?; string;
    countryIds?: Array<number>;
    regiondIds?: Array<number>;
}
