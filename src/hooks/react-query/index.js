import { request } from '@/http';
import { getRoute } from '@/api';
import {
    useMutation as rqUseMutation,
    useQuery as rqUseQuery,
} from '@tanstack/react-query';

const useQuery = ([routeKey, query], options = {}) => {
    const route = `https://palplug.com/d/api/${getRoute(routeKey)}`;

    if (!route) throw new Error('Invalid routeKey provided');

    return rqUseQuery({
        queryKey: [routeKey],
        queryFn: () =>
            request({
                url: route,
                method: 'get',
                data: query,
            }).then((response) => JSON.parse(response.data)),
        ...options,
    });
};

const useMutation = (routeKey, options = {}) => {
    const route = getRoute(routeKey);

    if (!route) throw new Error('Invalid routeKey provided');

    const { method = 'post', ...rest } = options;

    if (method === 'get')
        throw new Error('GET is not a valid HTTP method for useMutation hook');

    const mutationFn = (data) => {
        request({ url: route, data, method }).then((response) => response.data);
    };
    return rqUseMutation({
        mutationKey: [routeKey],
        mutationFn,
        ...rest,
    });
};

export { useMutation, useQuery };
