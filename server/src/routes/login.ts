import {
  Router,
  Request,
  Response,
  NextFunction
} from 'express';

import * as fs from 'fs';
import * as request from 'request';
import * as querystring from 'query-string';

const router: Router = Router();

// var fs = require('fs');

// var request = require('request'); // "Request" library
// var querystring = require('querystring');

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

var getRelated = function(pathFromStaind: string[], id: string, access_token: string) {
    // haven't saved this one yet
    if (!relatedArtists[id]) {

        relatedArtists[id] = pathFromStaind;

        fs.writeFileSync('./related.json', JSON.stringify(relatedArtists), 'utf8');

        if (pathFromStaind.length < 7) {
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            // // use the access token to access the Spotify Web API
            request.get(options, function(error: any, response: any, body: any) {
                // console.log(body);
                // console.log()
                // console.log()
                // for (var i = 0; i < body.artists.length; i++) {
                //     getRelated(pathFromStaind.push(id), body.artists[i].id, access_token);
                // }
                body.artists.forEach((artist: any) => {
                    var path = [...pathFromStaind],
                        artistId = artist.id;

                    path.push(artistId);

                    getRelated(path, artistId, access_token);
                });
            });
        }
    }
}

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
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: req.protocol + '://' + req.get('host') + redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
            },
            json: true
        };

    request.post(authOptions, function(error: any, response: any, body: any) {
        if (!error && response.statusCode === 200) {

            const access_token = body.access_token,
                refresh_token = body.refresh_token,
                expires_in = body.expires_in;

            // var options = {
            //   url: 'https://api.spotify.com/v1/artists/' + staindId + '/related-artists',
            //   headers: { 'Authorization': 'Bearer ' + access_token },
            //   json: true
            // };

            // // // use the access token to access the Spotify Web API
            // request.get(options, function(error, response, body) {
            //   console.log(body);
            // });

            // getRelated([], staindId, access_token);
            // console.log(app);
            
            req.session!.accessToken = access_token;
            req.session!.refreshToken = refresh_token;
            req.session!.accessTokenExpiry = Date.now() + expires_in * 1000;

            res.cookie('loggedIn', true);

            // we can also pass the token to the browser to make requests from there
            res.redirect('/');
        } else {
            const stringifiedError = querystring.stringify({
                    error: 'invalid_token'
                });

            res.redirect(`/?${stringifiedError}`);
        }
    });
  }
});

router.get('/login/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  debugger;
  console.log('trying to get refreshed token');

  request.post(authOptions, function(error: any, response: any, body: any) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;

      console.log('got it!!');
    //   debugger;
      res.send({
        'access_token': access_token
      });
    }
  });
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
