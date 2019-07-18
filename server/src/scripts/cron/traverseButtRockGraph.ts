import request from 'request';
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
        concurrency: 2
    }),
    clientId: string = process.env.CLIENT_ID,
    clientSecret: string = process.env.CLIENT_SECRET,
    dbConnectionString: string = process.env.DB_CONN_STRING;

let relatedArtists: any = {};

// authorize
getAuthorization().then((accessToken) => {
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

function getAuthorization(): Promise<string> {
    return new Promise((resolve, reject) => {
        const encodedAuthString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
            requestOptions = {
                url: `https://accounts.spotify.com/api/token`,
                form: {
                    grant_type: 'client_credentials'
                },
                headers: {
                    'Authorization': `Basic ${encodedAuthString}`
                }
            };

        request.post(requestOptions, (error: any, response: any, body: any) => {
            if (error) {
                reject(new Error(error));
            }

            const data = JSON.parse(body);

            // console.log(body);
            // console.log(typeof body);
            // console.log(body.access_token);
            resolve(data.access_token);
        });
    });
}

function getRelated(pathFromStaind: string[], id: string, accessToken: string): Promise<void> {
    let returnPromise = Promise.resolve();

    if (!relatedArtists[id] && pathFromStaind.length < 6) {
        returnPromise = new Promise((resolve) => {
            setTimeout(() => {
                relatedArtists[id] = pathFromStaind;
        
                const options = {
                    url: 'https://api.spotify.com/v1/artists/' + id + '/related-artists',
                    headers: { 'Authorization': 'Bearer ' + accessToken },
                    json: true
                };
        
                // // use the access token to access the Spotify Web API
                console.log(`Fetching related artists for ${id}...`);
                request.get(options, function(error: any, response: any, body: any) {
                    if (error) {
                        console.log(error);
                    }
        
                    if (!body.artists) {
                        console.log(body);
                        console.log(`No related artists for ${id}`);
                    }
        
                    const artists = body.artists || [],
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
            }, 3000);
        });
    }

    return returnPromise;
}