import { axiosClient } from './axios';

const request = ({ url, data, method }) => {
    const stringifiedData = data ? JSON.stringify(data) : undefined;
    switch (method) {
        case 'delete':
            return axiosClient.delete(url, { params: stringifiedData });
        case 'put':
            return axiosClient.put(url, stringifiedData);
        case 'patch':
            return axiosClient.patch(url, stringifiedData);
        case 'post':
            return axiosClient.post(url, stringifiedData);
        default:
            return axiosClient.get(url, { params: stringifiedData });
    }
};

export { request };
