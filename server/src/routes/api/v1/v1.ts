import {
    Router
} from 'express';

import searchRouter from './search';

const router: Router = Router();

router.use('/v1', searchRouter);

export default router;