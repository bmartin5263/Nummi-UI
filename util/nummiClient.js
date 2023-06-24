import axios from 'axios';

const nummiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NUMMI_API_URL,
    withCredentials: true,
    headers:{
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
    }
});

export default nummiClient;