import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import request from 'request';

import RelatedArtist from '../../../../database/models/RelatedArtist';

const searchGetHandler = function(req: Request, res: Response, next: NextFunction) {
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

            // woof, this is kind of a lame concession to how
            // awkward this is to unit test since
            // half of it is synchronous (or at least callback
            // driven which can be made mock synchronous in test)
            // TODO: resolve at least some of this by replacing
            // request here with axios or something more elegant
            return Promise.resolve();
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
            
            return returnPromise.then((body) => {
                res.json(body);
            });
        }
    });
}

export {
    searchGetHandler
}