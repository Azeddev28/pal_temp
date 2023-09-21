export const SERVER_URL =
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://103.98.213.146';

const ROUTES = {
    companiesList: `${SERVER_URL}/api/companies/companies-list/`,
    languagesList: `${SERVER_URL}/api/companies/industries-list/`,
    countriesList: `${SERVER_URL}/api/locations/countries-list/`,
    industriesList: `${SERVER_URL}/api/locations/languages-list/`,
    joinWaitlist: `${SERVER_URL}/api/users/join-waitlist/`,
};

export const getRoute = (routeKey) => ROUTES[routeKey];
