import {
    Request,
    Response,
    NextFunction
} from 'express';

import {searchGetHandler} from './searchHandler';

import axios from 'axios';

import RelatedArtist from '../../../../database/models/RelatedArtist';
import { iteratee } from 'lodash';
import ErrorCodes from '../../../../errors/ErrorCodes';

let req: Request,
    res: Response,
    next: NextFunction,
    nextPromise: Promise<void>,
    resJsonPromise: Promise<void>,
    mockGet: jest.SpyInstance,
    mockedAxios: jest.Mocked<typeof axios>;

beforeEach(() => {
    nextPromise = new Promise((resolve) => {
        resolve();
    });

    req = {
        query: {
            artist: 'bob ross'
        },
        session: {
            accessToken: 'happytrees'
        }
    } as any;

    res = {
        status: jest.fn(),
        json: jest.fn()
    } as any;

    next = jest.fn(() => {
        return nextPromise;
    }) as NextFunction;

    mockGet = jest.spyOn(axios, 'get');
    mockGet.mockImplementation(() => {
        return Promise.resolve();
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('when called', () => {
    it('should call axios\'s get funcdtion', () => {
        searchGetHandler(req, res, next);

        expect(axios.get).toHaveBeenCalled();
    });

    describe('when calling get', () => {
        it('should pass an url object as the first argument', () => {
            searchGetHandler(req, res, next);

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
                    return Promise.reject();
                });
            });

            it('should call the next function', () => {
                return searchGetHandler(req, res, next).finally(() => {
                    return expect(next).toHaveBeenCalled();
                });
            });

            describe('when calling next', () => {
                it('should pass an Error', () => {
                    expect.assertions(1);

                    return searchGetHandler(req, res, next).finally(() => {
                        return expect((next as any).mock.calls[0][0]).toBeInstanceOf(Error);
                    });
                });

                describe('when passing an Error', () => {
                    it('should have a status of 404', () => {
                        expect.assertions(1);

                        return searchGetHandler(req, res, next).finally(() => {
                            return expect((next as any)).toHaveBeenCalledWith(expect.objectContaining({
                                status: ErrorCodes.BadRequest
                            }));
                        }); 
                    })
                })
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

                it('should call res\'s json', () => {
                    return searchGetHandler(req, res, next).finally(() => {
                        return expect(res.json).toHaveBeenCalled();
                    })
                });

                describe('when calling res\'s json', () => {
                    it('should pass a response object', () => {
                        return searchGetHandler(req, res, next).finally(() => {
                            return expect(res.json).toHaveBeenCalledWith({
                                artists: {
                                    items: [
                                        {
                                            id: 'aaa',
                                            isbuttrock: true,
                                            stepsAwayFromStaind: 3
                                        },
                                        {
                                            id: 'bbb',
                                            isbuttrock: false,
                                            stepsAwayFromStaind: null
                                        }
                                    ]
                                }
                            });
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

                it('should call res\'s json', () => {
                    return searchGetHandler(req, res, next).finally(() => {
                        return expect(res.json).toHaveBeenCalled();
                    });
                });

                describe('when calling res\'s json', () => {
                    it('should pass a response object', () => {
                        return searchGetHandler(req, res, next).finally(() => {
                            return expect(res.json).toHaveBeenCalledWith({
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
});