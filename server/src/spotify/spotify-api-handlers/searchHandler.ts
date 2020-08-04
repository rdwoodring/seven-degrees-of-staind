import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import {
    buildRequestConfig
} from '../spotify-config-builders/axiosConfigBuilder';

import IRelatedArtist from '../../database/schemas/IRelatedArtist';
import RelatedArtist from '../../database/models/RelatedArtist';

const handleSearch = (artistName: string, accessToken: string): Promise<any> => {
        const url = `https://api.spotify.com/v1/search?q=${artistName}&type=artist&market=US&limit=10`,
            config: AxiosRequestConfig = buildRequestConfig(accessToken);

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
                        .then((relatedArtists: IRelatedArtist[]) => {
                            return relatedArtists.reduce<{
                                [id: string]: IRelatedArtist
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
                                    const relatedArtist: IRelatedArtist = relatedArtistsHashMap[artist.id];
    
                                    let isButtRock,
                                        stepsAwayFromStaind,
                                        pathFromStaind;
    
                                    if (relatedArtistsHashMap[artist.id]) {
                                        isButtRock = true;
                                        stepsAwayFromStaind = relatedArtist.pathFromStaind.length;
                                        pathFromStaind = relatedArtist.pathFromStaind;
                                    }
                                    else {
                                        isButtRock = false;
                                        stepsAwayFromStaind = null;
                                        pathFromStaind = null;
                                    }
    
                                    return {
                                        ...artist,
                                        isbuttrock: isButtRock,
                                        stepsAwayFromStaind: stepsAwayFromStaind,
                                        pathFromStaind: pathFromStaind
                                    };
                                });

                                return {
                                    ...response.data,
                                    artists: {
                                        ...response.data.artists,
                                        items: artists
                                    }
                                };
                            });
                } else {
                    return {
                        artists: {
                            items: []
                        }
                    };
                }
            })
            .catch((response: AxiosResponse) => {
            throw new Error(`Error communicating with Spotify API. Received status ${response.status} code.`);
            });
    };

export {
    handleSearch
};