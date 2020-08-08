import {handleSearch} from './searchHandler';

import axios, { AxiosResponse } from 'axios';

import IRelatedArtist from '../../database/schemas/IRelatedArtist';
import RelatedArtist from '../../database/models/RelatedArtist';
import IExpressError from '../../errors/IExpressError';
import ErrorCodes from '../../errors/ErrorCodes';

let artistName = 'bob ross',
    accessToken = 'happytrees',
    resJsonPromise: Promise<void>,
    mockGet: jest.SpyInstance,
    mockedAxios: jest.Mocked<typeof axios>;

beforeEach(() => {
    mockGet = jest.spyOn(axios, 'get');
    mockGet.mockImplementation(() => {
        return Promise.resolve({});
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('when called', () => {
    it('should call axios\'s get funcdtion', () => {
        handleSearch(artistName, accessToken);

        expect(axios.get).toHaveBeenCalled();
    });

    it('should return a Promise', () => {
        expect(handleSearch(artistName, accessToken)).toBeInstanceOf(Promise);
    });

    describe('when calling get', () => {
        it('should pass an url object as the first argument', () => {
            handleSearch(artistName, accessToken);

            expect(mockGet).toHaveBeenCalledWith('https://api.spotify.com/v1/search?q=bob ross&type=artist&market=US&limit=10', {
                headers: {
                    'Authorization': 'Bearer happytrees'
                }
            });
        });
    });

    describe('when the call to get resolves', () => {
        describe('when an error is returned', () => {
            beforeEach(() => {
                mockGet.mockImplementation(() => {
                    return Promise.reject({
                        status: 405,
                        statusText: 'Method not allowed'
                    } as AxiosResponse);
                });
            });

            it('should pass an Error', () => {
                expect.assertions(1);

                return handleSearch(artistName, accessToken).catch((err) => {
                    return expect(err).toBeInstanceOf(Error);
                });
            });

            describe('when passing an error', () => {
                it('should have a message containing the status code returned from the get request', () => {
                    expect.assertions(1);

                    return handleSearch(artistName, accessToken).catch((err) => {
                        return expect(err.message).toContain('405');
                    }); 
                });
            });
        });

        describe('when no error is returned', () => {
            let mockGetPromise: Promise<void>,
                mockFind: jest.SpyInstance,
                mockWhere: jest.SpyInstance,
                mockIn: jest.SpyInstance;

            describe('when the body contains an artists key and the artists key contains items', () => {
                beforeEach(() => {
                    mockGet.mockImplementation(() => {
                        return Promise.resolve({
                            data: {
                                artists: {
                                    items: [
                                        {
                                            id: 'aaa'
                                        },
                                        {
                                            id: 'bbb'
                                        }
                                    ]
                                }
                            }
                        });
                    });

                    mockFind = jest.spyOn(RelatedArtist, 'find');
                    mockWhere = jest.spyOn(RelatedArtist, 'where');
                    
                    mockFind.mockImplementation(() => {
                        return RelatedArtist;
                    });

                    mockWhere.mockImplementation(() => {
                        mockIn = jest.fn(() => {
                            return Promise.resolve([
                                {
                                    id: 'aaa',
                                    pathFromStaind: ['trapt', 'nickelback', 'aaa']
                                },
                                {
                                    id: 'bob ross',
                                    pathFromStaind: ['linkin park', 'bob ross']
                                }
                            ])
                        });

                        return {
                            in: mockIn
                        };
                    })
                });

                it('should pass a the returned object enhanced with ', () => {
                    expect.assertions(1);

                    return handleSearch(artistName, accessToken).then((data) => {
                        return expect(data).toEqual({
                            artists: {
                                items: [
                                    {
                                        id: 'aaa',
                                        isbuttrock: true,
                                        stepsAwayFromStaind: 3,
                                        pathFromStaind: [
                                            'trapt',
                                            'nickelback',
                                            'aaa'
                                        ]
                                    },
                                    {
                                        id: 'bbb',
                                        isbuttrock: false,
                                        stepsAwayFromStaind: null,
                                        pathFromStaind: null
                                    }
                                ]
                            }
                        });
                    });
                });
            });

            describe('when the body does not contain an artists key', () => {
                beforeEach(() => {
                    mockGet.mockImplementation(() => {
                        return Promise.resolve({});
                    });
                });

                it('should pass an object with an empty items array', () => {
                    return handleSearch(artistName, accessToken).then((data) => {
                        return expect(data).toEqual({
                            artists: {
                                items: []
                            }
                        });
                    });
                });
            });
        });
    });
});