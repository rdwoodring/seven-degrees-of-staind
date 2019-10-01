import {
    Request,
    Response,
    NextFunction
} from 'express';

// import {SessionData} from 'express-session';

import session from 'express-session';

// import * as requestDependency from 'request';

import tokenRefresher from './tokenRefresher';
// import { request } from 'http';
import request from 'request';
import { token } from 'morgan';

let req: Request,
    res: Response,
    next: NextFunction,
    nextPromise: Promise<void>,
    mockPost: jest.SpyInstance;

beforeEach(() => {
    nextPromise = new Promise((resolve) => {
        resolve();
    });

    req = {
        session: {}
    } as Request;

    res = {} as Response;

    next = jest.fn(() => {
        return nextPromise;
    }) as NextFunction;

    mockPost = jest.spyOn(request, 'post');
    mockPost.mockImplementation(() => {
        return Promise.resolve({});
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('when called', () => {
    describe('when the request\'s session does not have an accessTokenExpiry property', () => {
        it('should not call the post method of the request module', () => {
            tokenRefresher(req, res, next);

            return nextPromise.then(() => {
                expect(mockPost).not.toHaveBeenCalled();
            });
        });
        
        it('should call the next function', () => {
            tokenRefresher(req, res, next);
        });
    });
    
    describe('when the request\'s session has an accessTokenExpiry property', () => {
        beforeEach(() => {
            req = {
                ...req,
                clearCookie: jest.fn(),
                session: {
                    accessTokenExpiry: 10,
                    refreshToken: 'aaabbbccc'
                }
            } as any;
        });
    
        describe('when the accessTokenExpiry is less than the current date', () => {
            it('should call the post method of the request module', () => {
                tokenRefresher(req, res, next);
    
                expect(mockPost).toHaveBeenCalled();
            });
            
            it('should call the next function', () => {
                tokenRefresher(req, res, next);
            });

            describe('when calling the post method of the request module', () => {
                beforeEach(() => {
                    process.env.CLIENT_ID = 'joker';
                    process.env.CLIENT_SECRET = 'riddler';
                });

                it('should pass an authorization object', () => {
                    tokenRefresher(req, res, next);

                    expect(mockPost.mock.calls[0][0]).toEqual({
                        url: 'https://accounts.spotify.com/api/token',
                        headers: {
                            'Authorization': `Basic ${new Buffer('joker:riddler').toString('base64')}`
                        },
                        form: {
                            grant_type: 'refresh_token',
                            refresh_token: 'aaabbbccc'
                        },
                        json: true
                    });
                });
            });

            describe('when the post call resolves', () => {
                describe('when the request was successful', () => {
                    beforeEach(() => {
                        req = {
                            ...req,
                            session: {
                                ...req.session,
                                accessToken: 'hi',
                                refreshToken: 'aaabbbccc'
                            }
                        } as any;

                        res = {
                            ...res,
                            cookie: jest.fn()
                        } as any;

                        Date.now = jest.fn(() => {
                            return 3000;
                        });

                        mockPost.mockImplementation((opts, cb) => {
                            cb(null, {
                                statusCode: 200
                            }, {
                                access_token: 'dddeeefff',
                                expires_in: 10
                            });
                        });
                    });

                    it('should set the session.accessToken to the body\'s access_token', () => {
                        tokenRefresher(req, res, next);

                        expect(req.session!.accessToken).toEqual('dddeeefff');
                    });

                    it('should set the session.accessTokenExpiry to body\'s expires_in plus date.now times 1000', () => {
                        tokenRefresher(req, res, next);

                        return expect(req.session!.accessTokenExpiry).toEqual(3000 + 10 * 1000);
                    });

                    it('should call the response\'s cookie method', () => {
                        tokenRefresher(req, res, next);

                        return expect(res.cookie).toHaveBeenCalled();
                    });

                    it('should call the next method', () => {
                        tokenRefresher(req, res, next);

                        expect(next).toHaveBeenCalled();
                    });

                    describe('when calling the cookie method', () => {
                        it('should pass loggedIn and true', () => {
                            tokenRefresher(req, res, next);

                            return expect(res.cookie).toHaveBeenCalledWith('loggedIn', true);
                        })
                    });
                });

                describe('when the request was unsuccessful', () => {
                    beforeEach(() => {
                        req = {
                            ...req,
                            session: {
                                ...req.session,
                                accessToken: 'hi',
                                refreshToken: 'aaabbbccc'
                            }
                        } as any;

                        mockPost.mockImplementation((opts, cb) => {
                            cb('error');
                        });
                    });
                    
                    it('should delete the request.session.accessToken', () => {
                        tokenRefresher(req, res, next);

                        return nextPromise.then(() => {
                            expect(req.session!.accessToken).not.toBeDefined();
                        });
                    });
                    
                    it('should delete the request.session.accessTokenExpiry', () => {
                        tokenRefresher(req, res, next);

                        return nextPromise.then(() => {
                            expect(req.session!.accessTokenExpiry).not.toBeDefined();
                        });
                    });
                    
                    it('should delete the request.session.refreshToken', () => {
                        tokenRefresher(req, res, next);

                        return nextPromise.then(() => {
                            expect(req.session!.refreshToken).not.toBeDefined();
                        });
                    });
                    
                    it('should call the clearCookie method', () => {
                        tokenRefresher(req, res, next);

                        return nextPromise.then(() => {
                            expect(req.clearCookie).toHaveBeenCalled();
                        });
                    });

                    it('should call the next function', () => {
                        tokenRefresher(req, res, next);

                        expect(next).toHaveBeenCalled();
                    });

                    describe('when calling the claerCookie method', () => {
                        it('should pass loggedIn as the argument', () => {
                            tokenRefresher(req, res, next);

                            return nextPromise.then(() => {
                                expect(req.clearCookie).toHaveBeenCalledWith('loggedIn');
                            }); 
                        });
                    });

                    describe('when calling the next function', () => {
                        it('should pass along the error argument it received from the post call', () => {
                            tokenRefresher(req, res, next);

                            expect(next).toHaveBeenCalledWith('error');
                        });
                    });
                });
            });
        });
    });
});

