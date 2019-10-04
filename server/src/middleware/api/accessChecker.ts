import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

export default function accessChecker(req: Request, res: Response, next: NextFunction) {
    const accessTokenExpiry: number | undefined = req.session!.accessTokenExpiry ? parseInt(req.session!.accessTokenExpiry) : void(0),
        accessToken: string = req.session!.accessToken,
        refreshToken: string = req.session!.refreshToken;

        let err: Error | undefined;

    if (!accessToken) {
        err = new Error('Access Denied');
        // err.status = 403;
        res.status(403)
    }

    if (err) {
        // next(err);
        res.send(err)
    }
    else {
        next();
    }
}