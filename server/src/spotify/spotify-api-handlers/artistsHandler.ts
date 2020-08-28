import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import {
    buildRequestConfig
} from '../spotify-config-builders/axiosConfigBuilder';

import IRelatedArtist from '../../database/schemas/IRelatedArtist';
import RelatedArtist from '../../database/models/RelatedArtist';

const handleArtists = (artistId: string, accessToken: string): Promise<any> => {
    let isButtRock: Boolean,
        stepsAwayFromStaind: null | Number,
        pathFromStaind: null | String[];

    return RelatedArtist.findById(artistId)
        .then((relatedArtist: IRelatedArtist) => {
            isButtRock = true;
            stepsAwayFromStaind = relatedArtist.pathFromStaind.length;
            pathFromStaind = relatedArtist.pathFromStaind;

            return [
                ...relatedArtist.pathFromStaind
            ];
        })
        .catch(() => {
            isButtRock = false;
            stepsAwayFromStaind = null;
            pathFromStaind = null;

            return [
                artistId
            ];
        })
        .then((artistIds: String[]) => {
            const url = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`,
                config: AxiosRequestConfig = buildRequestConfig(accessToken);
        
            return axios.get(url, config)
                .then((response: AxiosResponse) => {
                    const otherArtists = response.data
                        .artists
                        .slice(0, -1)
                        .reduce((accumulator: any, artist: any) => {
                            return {
                                ...accumulator,
                                [artist.id]: artist
                            }
                        }, {}),
                        artistWithPathFromStaind = {
                            ...response.data.artists.slice(-1)[0],
                            isbuttrock: isButtRock,
                            stepsAwayFromStaind: stepsAwayFromStaind,
                            pathFromStaind: pathFromStaind,
                            _embedded: {
                                artists: otherArtists
                            }
                        }
                    
                    return {
                        artists: {
                            items: [
                                artistWithPathFromStaind
                            ]
                        }
                    }
                })
                .catch((response: AxiosResponse) => {
                    throw new Error(`Error communicating with Spotify API. Received status ${response.status} code.`)
                });
        });
};

export { 
    handleArtists 
};