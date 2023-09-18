import { axiosClient } from '@/http';
import {
    useMutation as rqUseMutation,
    useQuery as rqUseQuery,
} from '@tanstack/react-query';

const useQuery = ([endpointPath, query], options = {}) => {
    if (!endpointPath) throw new Error('Query endpoint not provided');

    return rqUseQuery({
        queryKey: endpointPath,
        queryFn: () =>
            axiosClient
                .get(endpointPath, {
                    data: query ? JSON.stringify(query) : undefined,
                })
                .then((response) => JSON.parse(response.data)),
        ...options,
    });
};

const request = ({ url, data, method }) => {
    const stringifiedData = JSON.stringify(data);
    switch (method) {
        case 'delete':
            return axiosClient.delete(url, { data: stringifiedData });
        case 'put':
            return axiosClient.put(url, stringifiedData);
        case 'patch':
            return axiosClient.patch(url, stringifiedData);
        default:
            return axiosClient.post(url, stringifiedData);
    }
};

const useMutation = (endpointPath, options = {}) => {
    if (!endpointPath) throw new Error('Mutation endpoint not provided');

    const { method, ...rest } = options;

    const mutationFn = (data) => {
        request({ url: endpointPath, data, method }).then(
            (response) => response.data
        );
    };
    return rqUseMutation({
        mutationKey: endpointPath,
        mutationFn,
        ...rest,
    });
};

export { useMutation, useQuery };
