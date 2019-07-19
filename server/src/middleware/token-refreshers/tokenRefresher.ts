import {
    Request,
    Response,
    NextFunction
} from 'express';

import * as request from 'request';

import {SessionOptions} from 'express-session'

export default function tokenRefresher(req: Request, res: Response, next: NextFunction) {
    const accessTokenExpiry: number | undefined = req.session!.accessTokenExpiry ? Number(req.session!.accessTokenExpiry) : undefined,
        refreshToken: string | undefined = req.session!.refreshToken,
        shouldRefreshToken: Boolean = Boolean(accessTokenExpiry && accessTokenExpiry < Date.now());

    if (shouldRefreshToken) {
        const authString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
            authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                headers: { 
                    'Authorization': `Basic ${(new Buffer(authString).toString('base64'))}`
                },
                form: {
                    grant_type: 'refresh_token',
                    refresh_token: refreshToken
                },
                json: true
            };

        request.post(authOptions, function(error: any, response: any, body: any) {
            if (!error && response.statusCode === 200) {
                const accessToken = body.access_token,
                    accessTokenExpiry = Date.now() + body.expires_in * 1000;
        
              req.session!.accessToken = accessToken;
              req.session!.accessTokenExpiry = accessTokenExpiry;

              req.cookies('loggedIn', true);

              next();
            } else {
                // uh oh, error
                // wipe the cookies, no access for lil johnny
                // res.clearCookie('accessToken');
                // res.clearCookie('accessTokenExpiry');
                // res.clearCookie('refreshToken');
                delete req.session!.accessToken;
                delete req.session!.accessTokenExpiry;
                delete req.session!.refreshToken;

                req.clearCookie('loggedIn');

                next(error);
            }
        });
    } else {
        // cookies suggest that the user has never authorized us
        // before. we'll just go ahead and display the unlogged
        // in UI and force them to the login screen whenever
        next();
    }
}