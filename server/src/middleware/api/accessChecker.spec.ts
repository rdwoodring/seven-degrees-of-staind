import {
    Request,
    Response,
    NextFunction
} from 'express';

import accessChecker from './accessChecker';

let req: Request,
    res: Response,
    next: NextFunction,
    nextPromise: Promise<void>;

beforeEach(() => {
    nextPromise = new Promise((resolve) => {
        resolve();
    });

    req = {
        session: {}
    } as Request;

    res = {
        status: jest.fn(),
        send: jest.fn()
    } as any;

    next = jest.fn(() => {
        return nextPromise;
    }) as NextFunction;
});

describe('when called', () => {
    describe('when the request\'s session does not have an accessTokenExpiry property', () => {
        it('should not call the next function', () => {
            accessChecker(req, res, next);

            expect(next).not.toHaveBeenCalled();
        });

        it('should call the res status method', () => {
            accessChecker(req, res, next);

            expect(res.status).toHaveBeenCalled();
        });

        it('should call the res send method', () => {
            accessChecker(req, res, next);

            expect(res.send).toHaveBeenCalled();
        });

        describe('when calling the status method', () => {
            it('should pass 403', () => {
                accessChecker(req, res, next);

                expect(res.status).toHaveBeenCalledWith(403);
            });
        });

        describe('when calling the send method', () => {
            it('should send an Error', () => {
                accessChecker(req, res, next);

                expect(res.send).toHaveBeenCalledWith(new Error('Access Denied'));
            })
        })
    });

    describe('when the request\'s session does have an accessToken', () => {
        beforeEach(() => {
            req = {
                ...req,
                session: {
                    accessToken: 'banana creme pie'
                }
            } as any;
        });

        it('should call the next function', () => {
            accessChecker(req, res, next);

            expect(next).toHaveBeenCalled();
        });
    });
});