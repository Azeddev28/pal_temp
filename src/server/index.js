export const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL;

const ROUTES = {
    companiesList: `${SERVER_URL}/d/api/companies/companies-list/`,
    industriesList: `${SERVER_URL}/d/api/companies/industries-list/`,
    countriesList: `${SERVER_URL}/d/api/locations/countries-list/`,
    languagesList: `${SERVER_URL}/d/api/locations/languages-list/`,
    joinWaitlist: `/d/api/users/join-waitlist/`,
    profileRegister: '/d/api/users/profile-register/',
    googleLink: `${SERVER_URL}/d/api/authentication/google-register`,
    linkedInLink: `${SERVER_URL}/d/api/authentication/linkedin-register`,
    githubLink: `${SERVER_URL}/d/api/authentication/github-register`,
    linkedin: `/d/api/authentication/linkedin-profile/`,
};

export const getRoute = (routeKey) => ROUTES[routeKey];
