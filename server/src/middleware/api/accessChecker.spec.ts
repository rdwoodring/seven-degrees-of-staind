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
        it('should throw an error', () => {
            expect(() => {
                accessChecker(req, res, next);
            }).toThrow();
        });
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