import axios from 'axios';

export const axiosClient = axios.create({
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

axios.defaults.withCredentials = true
const nummiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NUMMI_API_URL,
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

export default nummiClient;