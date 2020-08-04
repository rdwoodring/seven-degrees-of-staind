import {
    AxiosRequestConfig
} from 'axios';

const buildRequestConfig = (accessToken: string): AxiosRequestConfig => {
    const config: AxiosRequestConfig = {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    };

    return config;
};

export {
    buildRequestConfig
};