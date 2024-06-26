const ROUTES = {
    companiesList: `companies/companies-list/`,
    industriesList: `companies/industries-list/`,
    countriesList: `locations/countries-list/`,
    languagesList: `locations/languages-list/`,
    joinWaitlist: `users/join-waitlist/`,
    profileRegister: 'users/profile-register/',
    linkedinRegister: `authentication/linkedin-register/`,
    socialRegister: `authentication/social-register/`,
    userRoles: 'users/user-roles/',
};

export const getRoute = (routeKey) => ROUTES[routeKey];
