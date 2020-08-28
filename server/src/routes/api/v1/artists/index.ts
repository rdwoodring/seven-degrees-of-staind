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

import {
    handleArtists
} from '../../../../spotify/spotify-api-handlers/artistsHandler';

const router: Router = Router();

router.get('/artists', function(req: Request, res: Response, next: NextFunction) {
    if (!req.query.search) {
        const err = new Error('A search query parameter is required. Try appending ?search=yoursearchterm and retrying the request') as IExpressError;

        err.status = ErrorCodes.BadRequest;

        throw err;
    }

    handleSearch(req.query.search as string, req.session!.accessToken).then((data) => {
            res.json(data);
        })
        .catch((err: IExpressError) => {
            err.status = ErrorCodes.InternalServerError;

            next(err);
        });
});

router.get('/artists/:artistId', function(req: Request, res: Response, next: NextFunction) {
    handleArtists(req.params.artistId, req.session!.accessToken).then((data) => {
            res.json(data);
        })
        .catch((err: IExpressError) => {
            err.status = ErrorCodes.InternalServerError;

            next(err);
        });
});

export default router;