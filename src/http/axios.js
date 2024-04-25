import { SERVER_URL } from '@/api';
import { Axios } from 'axios';

const axiosClient = new Axios({
    baseURL: SERVER_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosClient };
