import {
    AxiosRequestConfig
} from 'axios';

import {
    buildRequestConfig
} from './axiosConfigBuilder';

let token: string;

beforeEach(() => {
    token = 'chuck e cheese';
});

it('should have a headers field with Authorization made up of the passed in token', () => {
    expect(buildRequestConfig(token)).toEqual({
        headers: {
            'Authorization': `Bearer chuck e cheese`
        }
    });
});