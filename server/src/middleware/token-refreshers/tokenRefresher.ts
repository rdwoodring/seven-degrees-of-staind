import {
    Request,
    Response,
    NextFunction
} from 'express';

import querystring from 'querystring';

import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

export default function tokenRefresher(req: Request, res: Response, next: NextFunction) {
    const accessTokenExpiry: number | undefined = req.session!.accessTokenExpiry ? Number(req.session!.accessTokenExpiry) : undefined,
        refreshToken: string | undefined = req.session!.refreshToken,
        shouldRefreshToken: Boolean = Boolean(accessTokenExpiry && accessTokenExpiry < Date.now());

    let returnPromise: Promise<any>;

    if (shouldRefreshToken && refreshToken) {
        const authString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
            formData = {
                grant_type: 'refresh_token',
                refresh_token: refreshToken
            },
            url = 'https://accounts.spotify.com/api/token',
            config: AxiosRequestConfig = {
                headers: { 
                    'Authorization': `Basic ${(Buffer.from(authString).toString('base64'))}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

        returnPromise = axios.post(url, querystring.stringify(formData), config)
            .then((response: AxiosResponse) => {
                const accessToken = response.data.access_token,
                    accessTokenExpiry = Date.now() + response.data.expires_in * 1000;
        
              req.session!.accessToken = accessToken;
              req.session!.accessTokenExpiry = accessTokenExpiry;

              res.cookie('loggedIn', true);

              next();
            })
            .catch((err) => {
                // uh oh, error
                // wipe the cookies, no access for lil johnny
                delete req.session!.accessToken;
                delete req.session!.accessTokenExpiry;
                delete req.session!.refreshToken;

                res.clearCookie('loggedIn');

                next(err);
            })

        
    } else {
        // cookies suggest that the user has never authorized us
        // before. we'll just go ahead and display the unlogged
        // in UI and force them to the login screen whenever
        next();

        returnPromise = Promise.resolve();
    }

    return returnPromise;
}