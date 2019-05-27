export class ApiEndpoint {
    public static PETS = '/pets';
    public static PETS_PAGES = ApiEndpoint.PETS + '/pages';

    public static ASSOCIATIONS = '/associations';

    public static COUNTRIES = '/countries';

    public static USERS = '/users';
    public static USERS_AUTH = ApiEndpoint.USERS + '/authenticate';

    static PROFESSIONAL_TYPES = '/professional-service-types';
    static PROFESSIONAL_SERVICE = '/professional-services';
}
