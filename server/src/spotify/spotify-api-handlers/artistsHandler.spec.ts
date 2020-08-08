import axios, {
    AxiosResponse,
    AxiosRequestConfig
} from 'axios';

import RelatedArtist from '../../database/models/RelatedArtist';
import { handleArtists } from './artistsHandler';

let artistId: string,
    accessToken: string,
    mockGet: jest.SpyInstance,
    mockFindById: jest.SpyInstance;

beforeEach(() => {
    mockGet = jest.spyOn(axios, 'get');
    mockGet.mockImplementation(() => {
        return Promise.resolve({
            data: {
                artists: [
                    {
                        id: 'chuck norris'
                    }
                ]
            }
        });
    });

    mockFindById = jest.spyOn(RelatedArtist, 'findById');
    mockFindById.mockImplementation(() => {
        return Promise.resolve({
            pathFromStaind: [
                'apple',
                'banana'
            ]
        });
    });

    artistId = 'Bob Ross';
    accessToken = 'chuck e cheese';
});

it('should call RelatedArtist.findById', async () => {
    expect.assertions(1);

    await handleArtists(artistId, accessToken);

    expect(mockFindById).toHaveBeenCalled();
});

it('should call axios.get', async () => {
    expect.assertions(1);
    
    await handleArtists(artistId, accessToken);

    expect(mockGet).toHaveBeenCalled();
});

describe('when calling RelatedArtist.findById', () => {
    it('should pass the passed in artistId', async () => {
        expect.assertions(1);
    
        await handleArtists(artistId, accessToken);
    
        expect(mockFindById).toHaveBeenCalledWith('Bob Ross');
    }); 
});

describe('when calling axios.get', () => {
    it('should pass a url containing the spotify artists api url', async () => {
        expect.assertions(1);

        await handleArtists(artistId, accessToken);

        expect(mockGet).toHaveBeenCalledWith(expect.stringContaining('https://api.spotify.com/v1/artists?ids'), expect.anything());
    });

    it('should pass an axios config option including the passed in access token', async () => {
        expect.assertions(1);

        await handleArtists(artistId, accessToken);

        expect(mockGet).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
            headers: {
                'Authorization': 'Bearer chuck e cheese'
            }
        }));
    });

    describe('when findById returns an artist', () => {
        beforeEach(() => {
            mockFindById.mockImplementation(() => {
                return Promise.resolve({
                    pathFromStaind: [
                        'apple',
                        'banana'
                    ]
                });
            });
        });

        it('should pass a url containing the retrieved pathFromStaind ids in a comma delimited string', async () => {
            expect.assertions(1);
    
            await handleArtists(artistId, accessToken);
    
            expect(mockGet).toHaveBeenCalledWith(expect.stringContaining('?ids=apple,banana'), expect.anything());
        });
    });
    
    describe('when findById does not return an artist', () => {
        beforeEach(() => {
            mockFindById.mockImplementation(() => {
                return Promise.reject(new Error('artist not found'));
            });
        });
        
        it('should pass a url containing the passed in artistId', async () => {
            expect.assertions(1);
    
            await handleArtists(artistId, accessToken);
    
            expect(mockGet).toHaveBeenCalledWith(expect.stringContaining('?ids=Bob Ross'), expect.anything());
        });
    });
});

describe('when the call to axios.get resolves', () => {
    describe('when only one artist is returned', () => {
        beforeEach(() => {
            mockGet.mockImplementation(() => {
                return Promise.resolve({
                    data: {
                        artists: [
                            {
                                id: 'chuck norris'
                            }
                        ]
                    }
                });
            });
        });
    
        it('should resolve the whole promise with an object containing a nested array of artists based on the artists returned from get', async () => {
            expect.assertions(1);
    
            const response = await handleArtists(artistId, accessToken);
    
            expect(response.artists.items[0]).toEqual(expect.objectContaining({
                id: 'chuck norris',
                pathFromStaind: [
                    'apple',
                    'banana'
                ],
                _embedded: {
                    artists: {}
                }
            }))
        });
    });

    describe('when multiple artists are returned', () => {
        beforeEach(() => {
            mockGet.mockImplementation(() => {
                return Promise.resolve({
                    data: {
                        artists: [
                            {
                                id: 'puke & snot'
                            },
                            {
                                id: 'chuck norris'
                            }
                        ]
                    }
                });
            });
        });
    
        it('should resolve the whole promise with an object containing a nested array of artists based on the artists returned from get', async () => {
            expect.assertions(1);
    
            const response = await handleArtists(artistId, accessToken);
    
            expect(response.artists.items[0]).toEqual(expect.objectContaining({
                id: 'chuck norris',
                pathFromStaind: [
                    'apple',
                    'banana'
                ],
                _embedded: {
                    artists: {
                        'puke & snot': {
                            id: 'puke & snot'
                        }
                    }
                }
            }))
        });
    })
});

describe('when the call to axios.get rejects', () => {
    beforeEach(() => {
        mockGet.mockImplementation(() => {
            return Promise.reject();
        });
    });

    it('should reject the whole promise with an error', async () => {
        expect.assertions(1);

        try {
            await handleArtists(artistId, accessToken);
        } catch (e) {
            expect(e).toBeInstanceOf(Error);
        }
    })
});