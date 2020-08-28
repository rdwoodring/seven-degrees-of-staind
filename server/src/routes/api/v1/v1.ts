import {
    Router
} from 'express';

import searchRouter from './search';
import artistsRouter from './artists';

const router: Router = Router();

router.use('/v1', searchRouter);
router.use('/v1', artistsRouter);

export default router;