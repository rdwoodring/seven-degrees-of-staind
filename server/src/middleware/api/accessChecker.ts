import {
    Request,
    Response,
    NextFunction
} from 'express';

export default function accessChecker(req: Request, res: Response, next: NextFunction) {
    const accessToken: string = req.session!.accessToken;

        let err: Error | undefined;

    if (!accessToken) {
        err = new Error('Access Denied');

        res.status(403)
    }

    if (err) {
        res.send(err)
    }
    else {
        next();
    }
}