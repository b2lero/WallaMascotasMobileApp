export class ApiEndpoint {
    public static PETS = '/pets';
    public static PETS_PAGES = ApiEndpoint.PETS + '/pages';
    public static PETS_CATEGORIES = '/pet-categories';

    public static ASSOCIATIONS = '/associations';
    public static ASSOCIATIONS_PAGES = ApiEndpoint.ASSOCIATIONS + '/pages';

    public static COUNTRIES = '/countries';

    public static USERS = '/users';
    public static USERS_AUTH = ApiEndpoint.USERS + '/authenticate';

    static PROFESSIONAL_TYPES = '/professional-service-types';
    static PROFESSIONAL_SERVICE = '/professional-services';

    public static HUB = 'http://10.0.2.2:3000/hub';
    public static TOPIC_ASSOCIATION_PETS = 'http://wallamascotas.api/v1/public/users/associations/pets';
}
