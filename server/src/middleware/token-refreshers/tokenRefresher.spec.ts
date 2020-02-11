import {
    Request,
    Response,
    NextFunction
} from 'express';

import tokenRefresher from './tokenRefresher';

import axios from 'axios';

import querystring from 'querystring';

let req: Request,
    res: Response,
    next: NextFunction,
    nextPromise: Promise<void>,
    mockStringify: jest.SpyInstance,
    mockPost: jest.SpyInstance;

beforeEach(() => {
    nextPromise = new Promise((resolve) => {
        resolve();
    });

    req = {
        session: {}
    } as Request;

    res = {
        clearCookie: jest.fn()
    } as unknown as Response;

    next = jest.fn(() => {
        return nextPromise;
    }) as NextFunction;

    mockPost = jest.spyOn(axios, 'post');
    mockPost.mockImplementation(() => {
        return Promise.resolve({});
    });

    mockStringify = jest.spyOn(querystring, 'stringify');
    mockStringify.mockImplementation(() => {
        return {
            thisis: 'somefakedata'
        }
    });
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('when called', () => {
    describe('when the request\'s session does not have an accessTokenExpiry property', () => {
        it('should not call the post method of the axios module', () => {
            tokenRefresher(req, res, next);

            return nextPromise.then(() => {
                expect(mockPost).not.toHaveBeenCalled();
            });
        });
        
        it('should call the next function', () => {
            tokenRefresher(req, res, next);

            expect(next).toHaveBeenCalled();
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
            it('should call the post method of the axios module', () => {
                tokenRefresher(req, res, next);
    
                expect(mockPost).toHaveBeenCalled();
            });

            it('should call the stringify method of the querystring module', () => {
                tokenRefresher(req, res, next);

                expect(mockStringify).toHaveBeenCalled();
            });

            describe('when calling the stringify method', () => {
                it('should pass a form data object with a grant_type and a refresh_token', () => {
                    tokenRefresher(req, res, next);

                    expect(mockStringify).toHaveBeenCalledWith({
                        grant_type: 'refresh_token',
                        refresh_token: 'aaabbbccc'
                    });
                });
            });

            describe('when calling the post method of the request module', () => {
                beforeEach(() => {
                    process.env.CLIENT_ID = 'joker';
                    process.env.CLIENT_SECRET = 'riddler';
                });

                it('should pass an authorization object', () => {
                    tokenRefresher(req, res, next);

                    expect(mockPost).toHaveBeenCalledWith('https://accounts.spotify.com/api/token', {
                            thisis: 'somefakedata'
                        },
                        {
                            headers: {
                                'Authorization': `Basic ${Buffer.from('joker:riddler').toString('base64')}`,
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
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

                        mockPost.mockImplementation(() => {
                            return Promise.resolve({
                                data: {
                                    access_token: 'dddeeefff',
                                    expires_in: 10
                                }
                            });
                        });
                    });

                    it('should set the session.accessToken to the body\'s access_token', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(req.session!.accessToken).toEqual('dddeeefff');
                        });
                    });

                    it('should set the session.accessTokenExpiry to body\'s expires_in plus date.now times 1000', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            return expect(req.session!.accessTokenExpiry).toEqual(3000 + 10 * 1000);
                        });

                    });

                    it('should call the response\'s cookie method', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            return expect(res.cookie).toHaveBeenCalled();
                        });
                    });

                    it('should call the next method', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(next).toHaveBeenCalled();
                        });
                    });

                    describe('when calling the cookie method', () => {
                        it('should pass loggedIn and true', () => {
                            return tokenRefresher(req, res, next).then(() => {
                                return expect(res.cookie).toHaveBeenCalledWith('loggedIn', true);
                            });
                        });
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

                        mockPost.mockImplementation(() => {
                            return Promise.reject('error');
                        });
                    });
                    
                    it('should delete the request.session.accessToken', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(req.session!.accessToken).not.toBeDefined();
                        });
                    });
                    
                    it('should delete the request.session.accessTokenExpiry', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(req.session!.accessTokenExpiry).not.toBeDefined();
                        });
                    });
                    
                    it('should delete the request.session.refreshToken', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(req.session!.refreshToken).not.toBeDefined();
                        });
                    });
                    
                    it('should call the clearCookie method', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(res.clearCookie).toHaveBeenCalled();
                        });
                    });

                    it('should call the next function', () => {
                        return tokenRefresher(req, res, next).then(() => {
                            expect(next).toHaveBeenCalled();
                        });

                    });

                    describe('when calling the claerCookie method', () => {
                        it('should pass loggedIn as the argument', () => {
                            return tokenRefresher(req, res, next).then(() => {
                                expect(res.clearCookie).toHaveBeenCalledWith('loggedIn');
                            }); 
                        });
                    });

                    describe('when calling the next function', () => {
                        it('should pass along the error argument it received from the post call', () => {
                            return tokenRefresher(req, res, next).then(() => {
                                expect(next).toHaveBeenCalledWith('error');
                            });
                        });
                    });
                });
            });
        });
    });
});

