export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const ROUTES = {
    companiesList: `${SERVER_URL}/d/api/companies/companies-list/`,
    industriesList: `${SERVER_URL}/d/api/companies/industries-list/`,
    countriesList: `${SERVER_URL}/d/api/locations/countries-list/`,
    languagesList: `${SERVER_URL}/d/api/locations/languages-list/`,
    joinWaitlist: `/d/api/users/join-waitlist/`,
    profileRegister: '/d/api/users/profile-register/',
    linkedinRegister: `/d/api/authentication/linkedin-register/`,
    socialRegister: `/d/api/authentication/social-register/`
};

export const getRoute = (routeKey) => ROUTES[routeKey];
