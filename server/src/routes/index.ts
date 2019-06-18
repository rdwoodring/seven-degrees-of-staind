import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

import * as path from 'path';

const router: Router = Router();

// /* GET home page. */
// router.get('/', function (req: Request, res: Response, next: NextFunction) {
//     res.send(`
//         <html>
//             <head></head>
            
//             <body>
//             TODO: serve up some UI here
//             </body>
//         </html>
//     `);
// });
// 
// module.exports = router;

router.get('/', function(req: Request, res: Response) {
    console.log('redirected');
    res.sendFile(path.join(__dirname, '../../..', 'public', 'index.html'));
});

export default router;