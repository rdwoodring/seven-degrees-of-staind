import {
    Request,
    Response,
    NextFunction
} from 'express';

import {searchGetHandler} from './searchHandler';

import request from 'request';

import RelatedArtist from '../../../../database/models/RelatedArtist';

let req: Request,
    res: Response,
    next: NextFunction,
    nextPromise: Promise<void>,
    resJsonPromise: Promise<void>,
    mockGet: jest.SpyInstance;

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

    mockGet = jest.spyOn(request, 'get');
    mockGet.mockImplementation((opts, cb) => {
        cb();
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('when called', () => {
    it('should call request\'s get funcdtion', () => {
        searchGetHandler(req, res, next);

        expect(mockGet).toHaveBeenCalled();
    });

    describe('when calling get', () => {
        it('should pass an options object as the first argument', () => {
            searchGetHandler(req, res, next);

            expect(mockGet.mock.calls[0][0]).toEqual({
                url: 'https://api.spotify.com/v1/search?q=bob ross&type=artist&market=US&limit=10',
                headers: {'Authorization': 'Bearer happytrees'},
                json: true
            });
        });
    });

    describe('when the call to get resolves', () => {
        describe('when an error is returned', () => {
            beforeEach(() => {
                mockGet.mockImplementation((opts, cb) => {
                    cb('oh shit', null, null);
                });
            });

            it('should call the next function', () => {
                searchGetHandler(req, res, next);

                expect(next).toHaveBeenCalled();
            });

            it('should call the res status method', () => {
                searchGetHandler(req, res, next);

                expect(res.status).toHaveBeenCalled();
            });

            describe('when calling next', () => {
                it('should pass an Error', () => {
                    searchGetHandler(req, res, next);

                    expect((next as any).mock.calls[0][0]).toBeInstanceOf(Error);
                });
            });

            describe('when calling status', () => {
                it('should pass 404', () => {
                    searchGetHandler(req, res, next);

                    expect(res.status).toHaveBeenCalledWith(404);
                });
            });
        });

        // this is kind of a gross way to handle this whole path
        describe('when no error is returned', () => {
            let mockGetPromise: Promise<void>,
                mockFind: jest.SpyInstance,
                mockWhere: jest.SpyInstance,
                mockIn: jest.SpyInstance;

            describe('when the body contains an artists key and the artists key contains items', () => {
                beforeEach(() => {
                    mockGetPromise = new Promise((resolve) => {
                        mockGet.mockImplementation((opts, cb) => {
                            cb(null, null, {
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
                            }).then(() => {
                                resolve();
                            });
                        });
                    });

                    mockFind = jest.spyOn(RelatedArtist, 'find');
                    mockWhere = jest.spyOn(RelatedArtist, 'where');
                    // mockIn = jest.spyOn(RelatedArtist, 'in');

                    // jest.spyOn(RelatedArtist, 'find')
                    // jest.spyOn(RelatedArtist, 'find')
                    mockFind.mockImplementation(() => {
                        return RelatedArtist;
                    });

                    mockWhere.mockImplementation(() => {
                        mockIn = jest.fn(() => {
                            return Promise.resolve([
                                {
                                    id: 'aaa'
                                },
                                {
                                    id: 'bob ross'
                                }
                            ])
                        });

                        return {
                            in: mockIn
                        };
                    })
                });

                it('should call res\'s json', () => {
                    searchGetHandler(req, res, next);

                    return mockGetPromise.then(() => {
                        return expect(res.json).toHaveBeenCalled();
                    });
                });

                describe('when calling res\'s json', () => {
                    it('should pass a response object', () => {
                        searchGetHandler(req, res, next);

                        return mockGetPromise.then(() => {
                            return expect(res.json).toHaveBeenCalledWith({
                                artists: {
                                    items: [
                                        {
                                            id: 'aaa',
                                            isbuttrock: true
                                        },
                                        {
                                            id: 'bbb',
                                            isbuttrock: false
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
                    mockGetPromise = new Promise((resolve) => {
                        mockGet.mockImplementation((opts, cb) => {
                            cb(null, null).then(() => {
                                resolve();
                            });
                        });
                    });
                });

                it('should call res\'s json', () => {
                    searchGetHandler(req, res, next);

                    return mockGetPromise.then(() => {
                        return expect(res.json).toHaveBeenCalled();
                    });
                });

                describe('when calling res\'s json', () => {
                    it('should pass a response object', () => {
                        searchGetHandler(req, res, next);

                        return mockGetPromise.then(() => {
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