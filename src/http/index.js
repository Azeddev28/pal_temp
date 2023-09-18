import { Axios } from 'axios';

const axiosClient = new Axios({
    baseURL: 'http://103.98.213.146', 
    // process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { axiosClient };
