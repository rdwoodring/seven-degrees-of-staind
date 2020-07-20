import {
    Router
} from 'express';

import v1 from './v1/v1';

import accessChecker from '../../middleware/api/accessChecker';

const router: Router = Router();

router.use('/api/*', accessChecker);

router.use('/api', v1);

export default router;