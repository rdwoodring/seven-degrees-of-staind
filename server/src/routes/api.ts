// var express = require('express');
// var router = express.Router();

// var request = require('request');

import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

// import 
import * as request from 'request';

import {Types} from 'mongoose';

import RelatedArtist from '../database/models/RelatedArtist';
// import RelatedArtist as RelatedArtistSchema from '../database/schemas/RelatedArtist';

const router: Router = Router();

// making sure that there's a valid accessToken in the session before proceeding with the request
router.use('/api/*', function(req: Request, res: Response, next: NextFunction) {
    const accessTokenExpiry: number | undefined = req.session!.accessTokenExpiry ? parseInt(req.session!.accessTokenExpiry) : void(0),
        accessToken: string = req.session!.accessToken,
        refreshToken: string = req.session!.refreshToken;

        let err: Error | undefined;

    if (!accessToken) {
        err = new Error('Access Denied');
        // err.status = 403;
        res.status(403)
    }

    if (err) {
        // next(err);
        res.send(err)
    }
    else {
        next();
    }
});

router.get('/api/v1/search', function (req: Request, res: Response, next: NextFunction) {
    const options = {
        url: 'https://api.spotify.com/v1/search?q=' + req.query.artist + '&type=artist&market=US&limit=10',
        headers: {'Authorization': 'Bearer ' + req.session!.accessToken},
        json: true
    };

    request.get(options, function(error: any, response: any, body: any) {
        if (error) {
            const err = new Error('Bad Request');
            res.status(404);
            
            next(err);
        }
        else {
            let returnPromise;

            if (body && body.artists && body.artists.items) {
                const ids = body.artists.items.map((artist: any) => {
                    return artist.id;
                });

                returnPromise = RelatedArtist.find()
                    .where('_id')
                    .in(ids)
                    .then((relatedArtists) => {
                        return relatedArtists.reduce<{
                            [id: string]: Object
                        }>((accumulator, relatedArtist) => {
                            return {
                                ...accumulator,
                                [relatedArtist.id]: relatedArtist 
                            };
                        }, {});
                    })
                    .then((relatedArtistsHashMap) => {
                        const artists = body.artists
                            .items
                            .map((artist: any)  => {
                                let isButtRock;

                                if (relatedArtistsHashMap[artist.id]) {
                                    isButtRock = true;
                                }
                                else {
                                    isButtRock = false;
                                }

                                return {
                                    ...artist,
                                    isbuttrock: isButtRock
                                };
                            });

                        return {
                            ...body,
                            artists: {
                                ...body.artists,
                                items: artists
                            }
                        };
                    });
            }
            else {
                // fudge... bad request maybe
                returnPromise = Promise.resolve({
                    artists: {
                        items: []
                    }
                });
            }
            
            returnPromise.then((body) => {
                res.json(body);
            });
        }
    });
});

export default router;