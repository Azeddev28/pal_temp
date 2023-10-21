export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://103.98.213.146';

const ROUTES = {
    companiesList: `${SERVER_URL}/api/companies/companies-list/`,
    industriesList: `${SERVER_URL}/api/companies/industries-list/`,
    countriesList: `${SERVER_URL}/api/locations/countries-list/`,
    languagesList: `${SERVER_URL}/api/locations/languages-list/`,
    joinWaitlist: `/api/users/join-waitlist/`,
    profileRegister: '/api/users/profile-register/',
};

export const getRoute = (routeKey) => ROUTES[routeKey];
