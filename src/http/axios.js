import { SERVER_URL } from '@/server';
import { Axios } from 'axios';

const axiosClient = new Axios({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosClient };
