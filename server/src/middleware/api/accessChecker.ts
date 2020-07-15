import {
    Request,
    Response,
    NextFunction
} from 'express';

import IExpressError from '../../errors/IExpressError';
import ErrorCodes from '../../errors/ErrorCodes';

export default function accessChecker(req: Request, res: Response, next: NextFunction) {
    const accessToken: string = req.session!.accessToken;

    if (!accessToken) {
        const err = new Error('Session does not have an access token') as IExpressError;

        err.status = ErrorCodes.Forbidden;

        throw err;
    }

    next();
}