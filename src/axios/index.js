import { SERVER_URL } from '@/server';
import axios from 'axios';

export const setAuthToken = (token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
const failedResponse = (error) => {
    if (
        error.response &&
        error.response.status &&
        error.response.status === 401
    ) {
        window.location.replace(AppRoutes.LOGOUT.path);
    }
    return Promise.reject(error);
};
export const getRequest = (route, data) => {
    const completeRoute = `${SERVER_URL}${route}`;
    return axios
        .get(completeRoute, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const postRequest = (route, data, requireAccessToken) => {
    const accessToken = window.sessionStorage.getItem('accessToken');
    let authenticatedHeaders;
    if (requireAccessToken && accessToken) {
        authenticatedHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
    }
    const completeRoute = `${SERVER_URL}${route}`;
    return axios
        .post(completeRoute, data, {
            headers: requireAccessToken && authenticatedHeaders,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const deleteRequest = (route, data) => {
    const completeRoute = `${SERVER_URL}${route}`;
    return axios
        .delete(completeRoute, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const putRequest = (route, data) => {
    const completeRoute = `${SERVER_URL}${route}`;
    return axios
        .put(completeRoute, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};
