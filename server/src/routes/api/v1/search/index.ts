import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import IExpressError from '../../../../errors/IExpressError';
import ErrorCodes from '../../../../errors/ErrorCodes';

import {
    handleSearch
} from '../../../../spotify/spotify-api-handlers/searchHandler';

const router: Router = Router();

router.get('/search', function(req: Request, res: Response, next: NextFunction) {
    handleSearch(req.query.artist as string, req.session!.accessToken).then((data) => {
            res.json(data);
        })
        .catch((err: IExpressError) => {
            err.status = ErrorCodes.InternalServerError;

            next(err);
        });
});



export default router;