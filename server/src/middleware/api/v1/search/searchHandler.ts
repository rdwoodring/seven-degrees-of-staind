import {
    Request,
    Response,
    NextFunction
} from 'express';

import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import RelatedArtist from '../../../../database/models/RelatedArtist';

const searchGetHandler = function(req: Request, res: Response, next: NextFunction) {
    const url = `https://api.spotify.com/v1/search?q=${req.query.artist}&type=artist&market=US&limit=10`,
        config: AxiosRequestConfig = {
            headers: {
                'Authorization': 'Bearer ' + req.session!.accessToken
            }
        };

    return axios.get(url, config)
        .then((response: AxiosResponse) => {
            let returnData;
            
            // TODO: bump TypeScript and replace this with optional chaining
            if (response.data && response.data.artists && response.data.artists.items) {
                const ids = response.data
                    .artists
                    .items
                    .map((artist: any) => {
                        return artist.id;
                    });

                return RelatedArtist.find()
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
                        const artists = response.data.artists
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

                            res.json({
                                ...response.data,
                                artists: {
                                    ...response.data.artists,
                                    items: artists
                                }
                            });
                        });
            } else {
                res.json({
                    artists: {
                        items: []
                    }
                });

                return;
            }
        })
        .catch((response: AxiosResponse) => {
            const err = new Error('Bad Request');

            res.status(404);

            next(err);
        });   
}

export {
    searchGetHandler
}