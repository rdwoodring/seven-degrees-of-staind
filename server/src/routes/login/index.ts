import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import * as querystring from 'query-string';

const router: Router = Router();

var redirect_uri: string = '/login/callback'; // Your redirect uri

var staindId: string = '5KDIH2gF0VpelTqyQS7udb';

var stateKey: string = 'spotify_auth_state';

var relatedArtists: any = {};

// var app = express();

var generateRandomString = function(length: number) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

/* GET login page. */
router.get('/login', function (req: Request, res: Response, next: NextFunction) {
    var state = generateRandomString(16);
    res.cookie(stateKey, state)
    
    var scope = '';
    
    // debugger;
    
    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: req.protocol + '://' + req.get('host') + redirect_uri,
        state: state
    }));
});

router.get('/login/callback', function(req, res) {
    
    // your application requests refresh and access tokens
    // after checking the state parameter
    
    const code = req.query.code || null,
    state = req.query.state || null,
    storedState = req.cookies ? req.cookies[stateKey] : null;
    
    if (state === null || state !== storedState) {
        res.redirect('/#' + querystring.stringify({
            error: 'state_mismatch'
        }));
    } else {
        res.clearCookie(stateKey);
        
        const url = 'https://accounts.spotify.com/api/token',
            authString = `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`,
            formData = {
                code: code,
                redirect_uri: `${req.protocol}://${req.get('host')}${redirect_uri}`,
                grant_type: 'authorization_code'
            },
            config: AxiosRequestConfig = {
                headers: {
                    'Authorization': `Basic ${Buffer.from(authString).toString('base64')}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            };

        axios.post(url, querystring.stringify(formData), config)
            .then((response: AxiosResponse) => {
                const accessToken = response.data.access_token,
                    refreshToken = response.data.refresh_token,
                    expiresIn = response.data.expires_in;

                req.session!.accessToken = accessToken;
                req.session!.refreshToken = refreshToken;
                req.session!.accessTokenExpiry = Date.now() + expiresIn * 1000;
        
                res.cookie('loggedIn', true);
        
                // we can also pass the token to the browser to make requests from there
                res.redirect('/');
            })
            .catch((err) => {
                const stringifiedError = querystring.stringify({
                    error: 'invalid_token'
                });

                console.log(err);

                res.redirect(`/?${stringifiedError}`);
            });
        
    }
});

router.get('/logout', function(req: Request, res: Response) {
    const stringifiedParams = querystring.stringify({
        loggedOut: true
    });
    
    delete req.session!.accessToken;
    delete req.session!.refreshToken;
    delete req.session!.accessTokenExpiry;
    
    res.clearCookie('loggedIn');
    
    res.redirect(`/?${stringifiedParams}`);
});

export default router;
