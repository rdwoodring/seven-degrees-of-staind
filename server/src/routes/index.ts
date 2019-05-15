import {
    Router,
    Request,
    Response,
    NextFunction
} from 'express';

const router: Router = Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.send(`
        <html>
            <head></head>
            
            <body>
            TODO: serve up some UI here
            </body>
        </html>
    `);
});

module.exports = router;
