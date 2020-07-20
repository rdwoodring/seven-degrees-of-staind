import {
    Router
} from 'express';

import {searchGetHandler} from './search';

const router: Router = Router();

router.use('/v1', searchGetHandler);

export default router;