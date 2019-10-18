import {
    Router
} from 'express';


import accessChecker from '../middleware/api/accessChecker';
import {searchGetHandler} from '../middleware/api/v1/search/searchHandler';

// import RelatedArtist as RelatedArtistSchema from '../database/schemas/RelatedArtist';

const router: Router = Router();

// making sure that there's a valid accessToken in the session before proceeding with the request
router.use('/api/*', accessChecker);

router.get('/api/v1/search', searchGetHandler);

export default router;