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
    return axios
        .get(route, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const postRequest = (route, data, headers) => {
    return axios
        .post(route, data, {
            headers: headers,
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const deleteRequest = (route, data) => {
    return axios
        .delete(route, data)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};

export const putRequest = (route, data) => {
    return axios
        .put(route, data)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            return failedResponse(error);
        });
};
