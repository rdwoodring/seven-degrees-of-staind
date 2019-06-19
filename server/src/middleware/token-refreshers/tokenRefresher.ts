import {
    Request,
    Response,
    NextFunction
} from 'express';
import * as request from 'request';

export default function tokenRefresher(req: Request, res: Response, next: NextFunction) {
    const accessTokenExpiry: number | undefined = req.cookies.accessTokenExpiry ? Number(req.cookies.accessTokenExpiry) : undefined,
        refreshToken: string | undefined = req.cookies.refreshToken,
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
        
              res.cookie('accessToken', accessToken);
              res.cookie('accessTokenExpiry', accessTokenExpiry);                

              next();
            } else {
                // uh oh, error
                // wipe the cookies, no access for lil johnny
                res.clearCookie('accessToken');
                res.clearCookie('accessTokenExpiry');
                res.clearCookie('refreshToken');

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