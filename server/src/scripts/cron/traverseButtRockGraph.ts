import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import querystring from 'querystring';
import dotenv from 'dotenv';
import Queue from 'p-queue';
import fs from 'fs';

dotenv.config();

if (!process.env.CLIENT_ID) {
    throw new Error('CLIENT_ID is not present in .env');
}

if (!process.env.CLIENT_SECRET) {
    throw new Error('CLIENT_SECRET is not present in .env');
}

if (!process.env.DB_CONN_STRING) {
    throw new Error('DB_CONN_STRING is not present in .env');
}

const staindId: string = '5KDIH2gF0VpelTqyQS7udb',
    queue = new Queue({
        concurrency: 10
    }),
    clientId: string = process.env.CLIENT_ID,
    clientSecret: string = process.env.CLIENT_SECRET,
    dbConnectionString: string = process.env.DB_CONN_STRING;

let relatedArtists: any = {};

function traverseButtRockGraph(): Promise<void> {
    // authorize
    return getAuthorization().then((accessToken) => {
        queue.add(() => {
            return getRelated([], staindId, accessToken)
        });

        return queue.onIdle();
    })
    .then(() => {
        const transformedRelatedArtists = Object.keys(relatedArtists).map((key) => {
            return {
                _id: key,
                pathFromStaind: relatedArtists[key]
            };
        });
        
        fs.writeFileSync('./related.json', JSON.stringify(transformedRelatedArtists), 'utf8');
        console.log('done');
    });
}

function getAuthorization(): Promise<string> {
    const url = 'https://accounts.spotify.com/api/token',
        encodedAuthString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
        config: AxiosRequestConfig = {
            headers: {
                'Authorization': `Basic ${encodedAuthString}`
            }
        },
        formData = {
            grant_type: 'client_credentials'
        };

    return axios.post(url, querystring.stringify(formData), config)
        .then((response: AxiosResponse) => {
            return response.data.access_token;
        });
}

function getRelated(pathFromStaind: string[], id: string, accessToken: string): Promise<void> {
    let returnPromise = Promise.resolve();

    if (!relatedArtists[id] && pathFromStaind.length < 7) {
        returnPromise = new Promise((resolve) => {
            setTimeout(() => {
                relatedArtists[id] = pathFromStaind;

                const url = `https://api.spotify.com/v1/artists/${id}/related-artists`,
                    config: AxiosRequestConfig = {
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        }
                    };
        
                // // use the access token to access the Spotify Web API
                console.log(`Fetching related artists for ${id}...`);
                console.log(`${queue.size} items in the queue...`);

                axios.get(url, config)
                    .then((response: AxiosResponse) => {
                        if (!response.data.artists) {
                            console.log(response.data);
                            console.log(`No related artists for ${id}`);
                        }
            
                        const artists = response.data.artists || [],
                            promises = artists.map((artist: any) => {
                                var path = [...pathFromStaind],
                                    artistId = artist.id;
            
                                path.push(artistId);
            
                                return queue.add(() => {
                                    return getRelated(path, artistId, accessToken)
                                });
                            });
            
                        resolve();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }, 3000);
        });
    }

    return returnPromise;
}

export default traverseButtRockGraph;