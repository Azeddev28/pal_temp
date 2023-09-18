import { Axios } from 'axios';

const axiosClient = new Axios({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosClient };
