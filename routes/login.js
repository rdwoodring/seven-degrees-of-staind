var express = require('express');
var router = express.Router();

var fs = require('fs');
var _ = require('lodash');

var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

var redirect_uri = 'http://localhost:3000/login/callback'; // Your redirect uri

var staindId = '5KDIH2gF0VpelTqyQS7udb';

var stateKey = 'spotify_auth_state';

var relatedArtists = {};

var app = express();

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var getRelated = function(pathFromStaind, id, access_token) {
    // haven't saved this one yet
    if (!relatedArtists[id]) {
        // pathFromStaind = _.clone(pathFromStaind);

        relatedArtists[id] = pathFromStaind;

        fs.writeFileSync('./related.json', JSON.stringify(relatedArtists), 'utf8');

        if (pathFromStaind.length < 7) {
            var options = {
                url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            // // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
                // console.log(body);
                // console.log()
                // console.log()
                // for (var i = 0; i < body.artists.length; i++) {
                //     getRelated(pathFromStaind.push(id), body.artists[i].id, access_token);
                // }
                _.forEach(body.artists, function(artist) {
                    var path = _.clone(pathFromStaind),
                        artistId = artist.id;

                    path.push(artistId);

                    getRelated(path, artistId, access_token);
                });
            });
        }
    }
}

/* GET home page. */
router.get('/', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state)

  var scope = '';

  res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    }));
});

router.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
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
        
        res.cookie('accessToken', access_token);
        res.cookie('refreshToken', refresh_token);
        res.cookie('accessTokenExpiry', Date.now() + expires_in);
        

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

router.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  debugger;
  console.log('trying to get refreshed token');

  request.post(authOptions, function(error, response, body) {
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

module.exports = router;
